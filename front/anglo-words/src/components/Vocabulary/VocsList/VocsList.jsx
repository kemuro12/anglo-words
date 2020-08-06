import React, { useState } from 'react';
import styles from './VocsList.module.css';
import { useHistory } from "react-router-dom";
import { List, Typography } from '@material-ui/core';
import Voc from './Voc/Voc';

const VocsList = (props) => {
    const [editVoc, setEditVoc] = useState(0);
    const history = useHistory();

    const handleListItemClick = (vocId) => {
        return (e) => {
            if(e.target.tagName !== "INPUT" && e.target.innerText !== "ОК") history.push('/vocabulary/' + vocId);
        }
    }

    const handleDeleteVoc = (vocId, vocTitle) =>{
        let options = {
            title: "Подтверждение Удаления",
            description: `Вы действительно хотите удалить Словарь "${vocTitle}" ?`,
            actions: [
                {
                    buttonTitle: "Да",
                    buttonClassName: "successButton",
                    buttonAction: async () => {
                        await props.deleteVoc(vocId)
                        let page = props.currentPage;
                        if(props.vocs.length === 1) page--;
                        props.getVocsByUserId(props.userId, page)
                    }
                },
                {
                    buttonTitle: "Нет",
                    buttonClassName: "errorButton",
                    buttonAction: () => 0
                }
            ]
        }
        return () => {
            props.toggleModal(true, options)
        }
    }

    const handleEditClick = (vocId) => {
        return () => {
            if(editVoc === 0) setEditVoc(vocId)
            else if(vocId === editVoc) setEditVoc(0)
            else {
                // Костыль из-за бага
                new Promise ((resolve, reject) => {
                    resolve(setEditVoc(0))
                })
                .then(() => setEditVoc(vocId))
            }
        }
    }

    const handleOnSubmitEditForm = () => {
        return async (formData) => {
            let currentVoc = props.vocs.find(voc => voc.id === editVoc);
            await props.updateVoc(editVoc, formData.title, currentVoc.description, formData.isPrivate ? 1 : 0, currentVoc.wordsCount)
            props.getVocsByUserId(props.userId, props.currentPage)
        }
    }

    const voc_mas = props.vocs.map( (voc, count) => 
        <Voc 
            voc={voc} 
            editMode={voc.id === editVoc ? true : false}
            key={voc.id}
            num={count}
            handleOnSubmitEditForm={ handleOnSubmitEditForm() }
            handleListItemClick={ handleListItemClick(voc.id) }
            handleEditClick={ handleEditClick(voc.id) }
            handleDeleteVoc={ handleDeleteVoc(voc.id, voc.title) } 
        />
    )
    
    return (
        <List>
            {voc_mas.length === 0 ? 
                <Typography>--- У вас нет ни одного словаря</Typography>
            :
                voc_mas
            }
        </List>
    )
}

export default VocsList;