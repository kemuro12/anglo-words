import React, { useState } from 'react';
import { List, Typography } from '@material-ui/core';
import Word from './Word/Word';

const WordsList = (props) => {
    const [editWord, setEditWord] = useState(0);

    const handleEditClick = (wordId) => {
        return () => {
            if(editWord === 0) setEditWord(wordId)
            else if(wordId === editWord) setEditWord(0)
            else {
                // Костыль из-за бага
                new Promise ((resolve, reject) => {
                    resolve(setEditWord(0))
                })
                .then(() => setEditWord(wordId))
            }
        }
    }

    const handleDeleteWord = (voc, wordId, word_eng) =>{
        let options = {
            title: "Подтверждение Удаления",
            description: `Вы действительно хотите удалить Слово "${word_eng}" ?`,
            actions: [
                {
                    buttonTitle: "Да",
                    buttonClassName: "successButton",
                    buttonAction: async () => {
                        await props.deleteWord(voc, wordId)
                        let page = props.currentPage;
                        if(props.words.length === 1) page--;
                        props.getWordsByVocId(voc.id, page)
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

    const handleOnSubmitEditForm = () => {
        return (formData) => {
            props.updateWord(editWord, formData.word_eng, formData.word_ru)
            setEditWord(0);
        }
    }

    const words_mas = props.words.map((word, count) => 
        <Word 
            key={count}
            num={count}
            editMode={word.id === editWord ? true : false}
            word={word}
            handleEditClick={ handleEditClick(word.id) }
            handleDeleteWord={ handleDeleteWord(props.voc, word.id, word.word_eng) }
            handleOnSubmitEditForm={ handleOnSubmitEditForm() }
        />
    )

    return (
        <List>
            {words_mas.length === 0 ? 
                <Typography>--- У вас нет ни одного слова</Typography>
            :
                words_mas
            }
        </List>
    )
}

export default WordsList;