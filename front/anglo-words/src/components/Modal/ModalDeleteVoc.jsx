import React from 'react';
import styles from './Modal.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const ModalContainer = (props) => {

    const onHandleClose = () => {
        props.toggleModal(false, {});
    }

    return (
        <Dialog
            open={props.showModal}
            onClose={ onHandleClose }
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.description}
            </DialogContent>
            <DialogActions>
                {
                    props.actions.map((action, num) => {
                        return <Button key={num} className={ styles[action.buttonClassName] } variant="contained" onClick={ () => { action.buttonAction(); onHandleClose() } } >{action.buttonTitle}</Button>
                    })
                }
        
            </DialogActions>
        </Dialog>
    )
}

export default ModalContainer;