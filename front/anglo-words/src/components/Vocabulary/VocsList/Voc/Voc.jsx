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
        <form onSubmit={props.handleSubmit} className={styles.editForm}>
            <Field 
                label="Название"
                name="title"
                size="small"
                autoFocus={true}
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
       
            <Button onClick={ props.submit } variant="contained" size="small" style={{marginLeft:"20px",background:'rgb(76,175,80)',color:'white'}} >Ок</Button>
        </form>
    )
}

const EditVocReduxForm = reduxForm({
    form: "editVocForm"
})(editVocForm)

const Voc = (props) => {
    const voc = props.voc;

    return (
        <ListItem button onClick={ props.handleListItemClick } divider >
            <ListItemIcon>
                {props.num + 1}
            </ListItemIcon> 

            { props.editMode ? 
                <EditVocReduxForm initialValues={{title: voc.title, isPrivate: voc.isPrivate}} onSubmit={ props.handleOnSubmitEditForm } /> 
            :
                <ListItemText primary={voc.title} />
            }
            

            <ListItemSecondaryAction >
                <div className={styles.rightBlock}>
                    <Hidden smDown>
                        <ListItemText primary={voc.wordsCount + "/50 слов"} className={styles.wordsCount} /> 
                    </Hidden>
                    
                    <IconButton onClick={ props.handleEditClick }>
                        <EditIcon style={{color:"rgb(255,152,0)"}}/>
                    </IconButton>
                    <IconButton onClick={ props.handleDeleteVoc }>
                        <DeleteIcon color="error"/>
                    </IconButton>
                </div>                        
            </ListItemSecondaryAction>  
        </ListItem>
    )
}

export default Voc;