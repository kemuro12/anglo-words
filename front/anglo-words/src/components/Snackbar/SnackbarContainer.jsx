import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { toggleSnackbar } from '../../redux/snackbar-reducer';

const SnackbarContainer = (props) => {
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        props.toggleSnackbar(false);
    };


    return (
        <Snackbar
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={props.showSnackbar}     
        >
            {props.showSnackbar ?
                <Alert onClose={handleClose} severity={props.snackbarType} variant="filled">{props.snackbarMessage}</Alert> 
            : 
                <div></div>
            }
            
        </Snackbar>
    )
}

const mapStateToProps = (state) => {
    return {
      showSnackbar: state.snackbar.showSnackbar,
      snackbarMessage: state.snackbar.snackbarMessage,
      snackbarType: state.snackbar.snackbarType
    }
}

export default connect(mapStateToProps, { toggleSnackbar })(SnackbarContainer);