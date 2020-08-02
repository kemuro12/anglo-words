import React, { useState } from 'react';
import { Card, Typography, Button } from '@material-ui/core';
import { Input } from '../../templates/FormsControls/FormsControls';
import styles from './Game.module.css';
import { requiredField } from '../../../utils/validators/validators';
import { reduxForm, Field } from 'redux-form';
import TableResult from './TableResult/TableResult';

const questForm = React.memo((props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.questBlock}>
            <div >
                <Field 
                    name="eng"
                    size="small"
                    disabled
                    className={styles.input}
                    autoFocus={true}
                    component={Input}  
                />
            </div>

            <div>
                {"<=>"}
            </div>

            <div >
                <Field 
                    name="ru"
                    size="small"
                    value="pizda"
                    className={styles.input}
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Button onClick={ props.submit } className={styles.buttonStart} variant="contained" size="small" color="primary">Ок</Button>
            </div>
        </form>
    )
})

const QuestInputReduxForm = reduxForm({
    form: "questInputForm",
    enableReinitialize: true
})(questForm)

const Game = (props) => {

    const [currentWord, setCurrentWord] = useState(0);

    const words = props.words;

    const onAnswerQuestion = (formData) => {
        words[currentWord].correct = 
        formData.ru === words[currentWord].word_ru 
        ? true : false;

        words[currentWord].displayed_eng = formData.eng;
        words[currentWord].displayed_ru = formData.ru;
        setCurrentWord(currentWord + 1);
    }
    
    if(words.length === currentWord) return <TableResult words={words} />

    return (
        <div className={styles.gameBlock}>
            <Card className={styles.block}>

                <Typography>
                    Вопрос №{currentWord + 1}
                </Typography>

                <QuestInputReduxForm initialValues={{eng: words[currentWord].displayed_eng, ru: words[currentWord].displayed_ru}} onSubmit={ onAnswerQuestion } />
   
            </Card>          
        </div>
    )
}

export default Game;