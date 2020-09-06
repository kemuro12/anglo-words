import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './Word.module.css';
import { Input } from '../../../templates/FormsControls/FormsControls';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Hidden, IconButton, Typography, Button, Divider } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { requiredField } from '../../../../utils/validators/validators';

const editWordForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.editForm}>
            <Field 
                label="Слово"
                className={styles.formInput}
                name="word_eng"
                size="small"
                autoFocus={true}
                component={Input}
                validate={[requiredField]}
                onKeyDown={ (e) => e.keyCode === 13 ? props.submit() : 0 }
            />
        
            <Hidden only={['xs','sm']}>
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
            </Hidden>
            
            <Hidden mdUp>

                <Field 
                    label="Перевод"
                    className={styles.formInput}
                    name="word_ru"
                    size="small"
                    component={Input} 
                    onKeyDown={ (e) => e.keyCode === 13 ? props.submit() : 0 }
                />

            </Hidden>

            <Button onClick={ props.submit } variant="contained" size="small" className={styles.buttonOk} >Ок</Button>
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
                <div className={styles.wordsBlock}>
                    <ListItemText primary={word.word_eng} className={styles.word} />
                    <Hidden smUp>
                        <Divider/>
                        <ListItemText primary={word.word_ru} className={styles.word} />
                    </Hidden>
                </div>
                

                <ListItemSecondaryAction >
                    <div className={styles.rightBlock}>
                        <Hidden only='xs'>
                            <Typography className={styles.wordRu}>
                                <Hidden smDown>
                                    {word.word_ru.length ? "Перевод:" : ""}
                                </Hidden>
                                {word.word_ru}
                            </Typography>
                        </Hidden>
                        
                        {props.isAuth && props.isOwner ? 
                            <>
                                <IconButton onClick={ props.handleEditClick }>
                                    <EditIcon style={{color:"rgb(255,152,0)"}}/>
                                </IconButton>
                                <IconButton onClick={ props.handleDeleteWord }>
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            </>
                        : ""}
                    </div>                        
                </ListItemSecondaryAction>  
             </>
            }
     
        </ListItem>
    )
}

export default Word;