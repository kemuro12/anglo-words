import React, { useState } from 'react';
import { Card, Typography, Button, Box } from '@material-ui/core';
import { Input } from '../../templates/FormsControls/FormsControls';
import styles from './Game.module.css';
import { reduxForm, Field } from 'redux-form';
import TableResult from './TableResult/TableResult';

const questForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.questBlock} >
            <div >
                <Field 
                    name="main"
                    size="small"
                    disabled
                    className={styles.input}
                    component={Input}  
                />
            </div>

            <Box display={{xs:'none', sm:'none', md:'block'}}>
                <div>
                    {"<=>"}
                </div>
            </Box>
            

            <div >
                <Field 
                    name="inputed"
                    size="small"
                    className={styles.input}
                    autoComplete="off"
                    autoFocus
                    onKeyDown={ (e) => e.keyCode === 13 && props.submit() }
                    component={Input}
                />
            </div>
            <div>
                <Button onClick={ props.submit } className={styles.buttonStart} variant="contained" size="small" color="primary">Ок</Button>
            </div>
        </form>
    )
}

const QuestInputReduxForm = reduxForm({
    form: "questInputForm",
    enableReinitialize: true
})(questForm)

const Game = React.memo((props) => {
 
    const [openForm, setOpenForm] = useState(true);
    const [currentWord, setCurrentWord] = useState(0);

    const words = props.words;

    const onClickEndGame = () => {
        props.clearGame();
    }

    const onAnswerQuestion = (formData) => {
        words[currentWord].correct = 
        formData.inputed === words[currentWord].answer 
        ? true : false;

        words[currentWord].inputed = formData.inputed;

        setCurrentWord(currentWord + 1);

        new Promise ((resolve, reject) => {
            resolve(setOpenForm(false))
        }).then(() => setOpenForm(true))
        
    }
    
    if(words.length === currentWord) return <TableResult words={words} onClickEndGame={ onClickEndGame } />

    return (
        <div className={styles.gameBlock}>
            <Button size="small" style={{color:'red'}} onClick={ onClickEndGame }>Закончить</Button>
            <Card className={styles.block}>
                

                <Typography>
                    Вопрос №{currentWord + 1} / {words.length}
                </Typography>

                { openForm && <QuestInputReduxForm initialValues={{main: words[currentWord].main, inputed: words[currentWord].inputed}} onSubmit={ onAnswerQuestion } />}
   
            </Card>          
        </div>
    )
})

export default Game;