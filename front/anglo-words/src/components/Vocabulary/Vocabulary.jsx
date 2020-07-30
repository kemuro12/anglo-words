import React, { useState } from 'react';
import styles from './Vocabulary.module.css';
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { requiredField } from '../../utils/validators/validators';
import { Input, CheckBox } from '../templates/FormsControls/FormsControls';

const addVocForm = (props) => {

    const onSubmitForm = () => {
        new Promise((resolve, reject) => {
            resolve(props.submit())
        }).then(() => props.reset())
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div >
                <Field 
                    label="Название"
                    name="title"
                    variant="filled"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div >
                <Field 
                    label="Описание"
                    name="description"
                    variant="filled"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    type="checkbox" 
                    name="isPrivate"
                    label="Приватность"
                    color="primary" 
                    component={CheckBox} 
                />
            </div>

            <Button onClick={ onSubmitForm } variant="contained" size="small" color="primary">Добавить</Button>
        </form>
    )
}

const AddVocReduxForm = reduxForm({
    form: "addVocForm"
})(addVocForm)

const editVocForm = (props) => {
    const onSubmitForm = () => {
        new Promise((resolve, reject) => {
            resolve(props.submit())
        }).then(() => props.reset())
    }

    return (
        <form onSubmit={props.handleSubmit} className={styles.editForm}>
            <Field 
                label="Название"
                name="title"
                variant="filled"
                size="small"
                autoFocus={true}
                component={Input}
                validate={[requiredField]}
            />

            <Button onClick={ props.submit } variant="contained" size="small" color="primary">Ок</Button>
        </form>
    )
}

const EditVocReduxForm = reduxForm({
    form: "editVocForm"
})(editVocForm)

const Vocabulary = (props) => {

    const [editVoc, setEditVoc] = useState(0);
    const [accordionOpen, setAccordionOpen] = useState(false);

    const onToggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    }

    const history = useHistory(); 

    const onAddVocSubmit = (formData) => {
        props.addNewVoc(formData.title, formData.description, formData.isPrivate, props.user)
        setAccordionOpen(false);
    }

    const onEditVocSubmit = (formData) => {
        let currentVoc = props.vocs.filter(voc => voc.id === editVoc)[0];
        props.updateVoc(editVoc, formData.title, currentVoc.description, currentVoc.isPrivate)
        setEditVoc(0);
    }
   
    const onListClick = (vocId) => {
        history.push('/vocabulary/' + vocId);
    }

    const onEditClick = (vocId) => {
        if(vocId === editVoc) setEditVoc(0);
        else {
            new Promise ((resolve, reject) => {
                resolve(setEditVoc(0))
            })
            .then(() => setEditVoc(vocId))
        }
    }

    const onDeleteClick = (vocId) => {
        props.deleteVoc(vocId);
    }

    const voc_mas = props.vocs.map((voc, counter) => {
        return (
            <ListItem button onClick={ () => onListClick(voc.id) } divider key={voc.id} >
                <ListItemIcon>
                    {counter + 1}
                </ListItemIcon> 

                { editVoc === voc.id ? <EditVocReduxForm initialValues={{title: voc.title}} onSubmit={ onEditVocSubmit } /> 
                :
                <ListItemText primary={voc.title} />
                }
                

                <ListItemSecondaryAction >
                    <div className={styles.rightBlock}>
                        <ListItemText primary={voc.wordsCount + "/50 слов"} className={styles.wordsCount} />    
                        <IconButton onClick={() => onEditClick(voc.id)}>
                            <EditIcon style={{color:"rgb(255,152,0)"}}/>
                        </IconButton>
                        <IconButton onClick={() => onDeleteClick(voc.id)}>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </div>                        
                </ListItemSecondaryAction>  
            </ListItem>       
        )
    })

    return (
        <div className={styles.vocBlock}>   
            <List>
                {voc_mas}
            </List>
            <Accordion expanded={ accordionOpen } onChange={ onToggleAccordion }>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        Добавить Словарь
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddVocReduxForm onSubmit={ onAddVocSubmit } />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Vocabulary;