import React, { useState } from  'react';
import styles from './Words.module.css';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button,  } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Input } from '../templates/FormsControls/FormsControls';
import { Field, reduxForm } from 'redux-form';
import { requiredField } from '../../utils/validators/validators';
import WordsListContainer from './WordsList/WordsListContainer';

const addWordForm = (props) => {

    const onSubmitForm = () => {
        //После отправки закрываем Accordion, тем самым зануляем поля формы, и снова открываем
        //чтобы вызвать autoFocus, тем самым делаем удобным и быстрым ввод новых данных 
        new Promise((resolve, reject) => {
            resolve(props.submit())
        }).then(() => {
            new Promise((resolve, reject) => {
                resolve(props.setAccordionOpen(false))
            }).then(() => props.setAccordionOpen(true))
        })
    }

    return (
        <form onSubmit={props.handleSubmit} style={{display:'flex'}}>
            <div>
                <Field 
                    label="Слово"
                    name="word_eng"
                    size="small"
                    autoComplete="off"
                    component={Input}
                    validate={[requiredField]}
                    autoFocus={true}
                    onKeyDown={ (e) => e.keyCode === 13 ? onSubmitForm() : 0 }
                />
            </div>

            <div className={styles.wordRu}>
                <Field 
                    label="Перевод"
                    name="word_ru"
                    autoComplete="off"
                    size="small"
                    component={Input}
                    onKeyDown={ (e) => e.keyCode === 13 ? onSubmitForm() : 0 }
                />
            </div>

            <Button onClick={ onSubmitForm } variant="contained" size="small" color="primary">Добавить</Button>
        </form>
    )
}

const AddWordReduxForm = reduxForm({
    form: "addWordForm"
})(addWordForm)

const Words = (props) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const onToggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    }

    const onAddWordSubmit = (formData) => {
        props.addNewWord(props.voc, formData.word_eng, formData.word_ru ? formData.word_ru : "" )
    }

    return (
        <div>
            <Accordion expanded={ accordionOpen } onChange={ onToggleAccordion }>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        Добавить Слово
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {accordionOpen && <AddWordReduxForm accordionOpen={accordionOpen} setAccordionOpen={setAccordionOpen} onSubmit={ onAddWordSubmit } /> }
                </AccordionDetails>
            </Accordion>
           
            <WordsListContainer />
        </div>
        
    )
}

export default Words