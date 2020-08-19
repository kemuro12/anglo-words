import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './Voc.module.css';
import { Field, reduxForm } from 'redux-form';
import { Input, CheckBox } from '../../../templates/FormsControls/FormsControls';
import { requiredField } from '../../../../utils/validators/validators';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Hidden, Button } from '@material-ui/core';

const editVocForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.editForm} >
            

            <Field 
                label="Название"
                className={styles.formInput}
                name="title"
                size="small"
                autoFocus={true}
                autoComplete="off"
                component={Input}
                validate={[requiredField]}
            />

            <Field 
                label="Описание"
                className={styles.formInput}
                name="description"
                size="small"
                autoComplete="off"
                component={Input}
                validate={[requiredField]}
            />

            <Field 
                type="checkbox" 
                name="isPrivate"
                label="Приватность"
                color="primary"
                component={CheckBox} 
            />
    
            <Button onClick={ props.submit } variant="contained" size="small" className={styles.buttonOk} >
                Ок
            </Button>

        </form>
    )
}

const EditVocReduxForm = reduxForm({
    form: "editVocForm"
})(editVocForm)

const Voc = (props) => {
    
    const voc = props.voc;

    return (
        <ListItem button onClick={ props.handleListItemClick } className={styles.listItem} divider >
            <ListItemIcon>
                {props.num + 1}
            </ListItemIcon> 

            { props.editMode ? 
                <EditVocReduxForm initialValues={{title: voc.title, description: voc.description, isPrivate: voc.isPrivate}} onSubmit={ props.handleOnSubmitEditForm } /> 
            :
                <ListItemText className={styles.title} primary={voc.title} />
            }
            

            <ListItemSecondaryAction >
                <div className={styles.rightBlock}>
                    <Hidden smDown>
                        <ListItemText primary={voc.wordsCount + `/${props.maxWords} слов`} className={styles.wordsCount + " " + (voc.wordsCount >= props.maxWords ? styles.maxWords : "")} /> 
                    </Hidden>
                    
                    <Hidden { ...{only: props.editMode ? 'xs' : [] } } >
                        <IconButton onClick={ props.handleEditClick }>
                            <EditIcon style={{color:"rgb(255,152,0)"}}/>
                        </IconButton>
                        <IconButton onClick={ props.handleDeleteVoc }>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </Hidden>

                </div>                        
            </ListItemSecondaryAction>  
        </ListItem>
    )
}

export default Voc;