import React, { useState } from 'react';
import styles from './Vocabulary.module.css';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field, reduxForm } from 'redux-form';
import { requiredField } from '../../utils/validators/validators';
import { Input, CheckBox } from '../templates/FormsControls/FormsControls';
import VocsListContainer from './VocsList/VocsListContainer';
import Preloader from '../templates/Preloader/Preloader';
import Pagination from '@material-ui/lab/Pagination';

const addVocForm = (props) => {

    const onSubmitForm = () => {
        props.submit()
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div >
                <Field 
                    label="Название"
                    name="title"
                    variant="filled"
                    autoComplete="off"
                    autoFocus
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div >
                <Field 
                    label="Описание"
                    name="description"
                    variant="filled"
                    autoComplete="off"
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

const Vocabulary = (props) => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    console.log(props)
    
    const countOfVocs = props.pageOptions.countOfVocs;
    const pageSize = props.pageOptions.pageSize;

    const onPageChange = (e, value) => {
        props.getVocsByUserId(props.user.userId, value) 
    }

    const onToggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    }
    
    const onAddVocSubmit = async (formData) => {
        await props.addNewVoc(formData.title, formData.description, formData.isPrivate, props.user)
        props.getVocsByUserId(props.user.userId, countOfVocs % pageSize === 0 ? props.currentPage + 1 : props.currentPage)
        setAccordionOpen(false);
    }

    return (
        <div className={styles.vocBlock}>   

            <Accordion expanded={ accordionOpen } onChange={ onToggleAccordion }>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        Создать Словарь
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {accordionOpen && <AddVocReduxForm  accordionOpen={accordionOpen} setAccordionOpen={setAccordionOpen} onSubmit={ onAddVocSubmit } /> }
                </AccordionDetails>
            </Accordion>

            <Pagination shape="rounded" count={ Math.ceil(countOfVocs / pageSize) }  className={styles.paginator} color="primary"  page={ props.currentPage } onChange={ onPageChange } />

            {props.isLoading ? 
            <Preloader size="small" />
                :
            <VocsListContainer />
            }
            
              
        </div>
    )
}

export default Vocabulary;