import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './Word.module.css';
import { Input } from '../../../templates/FormsControls/FormsControls';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Hidden, IconButton, Typography, Button } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { requiredField } from '../../../../utils/validators/validators';

const editWordForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.editForm}>
            <Field 
                label="Слово"
                name="word_eng"
                size="small"
                autoFocus={true}
                component={Input}
                validate={[requiredField]}
                onKeyDown={ (e) => e.keyCode === 13 ? props.submit() : 0 }
            />
        
                <ListItemSecondaryAction >
                    <div className={styles.rightBlock}>
                        <div className={styles.wordRu}>
                            <Field 
                                label="Перевод"
                                name="word_ru"
                                size="small"
                                component={Input} 
                                onKeyDown={ (e) => e.keyCode === 13 ? props.submit() : 0 }
                            />
                        </div>
                        <IconButton onClick={ props.handleEditClick }>
                            <EditIcon style={{color:"rgb(255,152,0)"}}/>
                        </IconButton>
                        <IconButton onClick={ props.handleDeleteVoc }>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </div>                        
                </ListItemSecondaryAction>  

            
       
            <Button onClick={ props.submit } variant="contained" size="small" style={{marginLeft:"20px",background:'rgb(76,175,80)',color:'white'}} >Ок</Button>
        </form>
    )
}

const EditWordReduxForm = reduxForm({
    form: "editWordForm"
})(editWordForm)

const Word = (props) => {
    const word = props.word;

    return (
        <ListItem  onClick={ props.handleListItemClick } divider >
            <ListItemIcon>
                {props.num + 1}
            </ListItemIcon> 

            { props.editMode ? 
                <EditWordReduxForm 
                    handleEditClick={ props.handleEditClick } 
                    handleDeleteWord={ props.handleDeleteWord }
                    initialValues={{word_eng: word.word_eng, word_ru: word.word_ru}} 
                    onSubmit={ props.handleOnSubmitEditForm } 
                />
            :
             <>
                <ListItemText primary={word.word_eng} />

                <ListItemSecondaryAction >
                    <div className={styles.rightBlock}>
                        <Typography className={styles.wordRu}>
                            {word.word_ru.length ? "Перевод:" : ""} {word.word_ru}
                        </Typography>
                        <IconButton onClick={ props.handleEditClick }>
                            <EditIcon style={{color:"rgb(255,152,0)"}}/>
                        </IconButton>
                        <IconButton onClick={ props.handleDeleteWord }>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </div>                        
                </ListItemSecondaryAction>  
             </>
            }
     
        </ListItem>
    )
}

export default Word;