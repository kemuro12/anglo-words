import React from 'react';
import ModalDeleteVoc from './ModalDeleteVoc';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/modal-reducer';

const ModalContainer = (props) => {

    return (
        <ModalDeleteVoc 
            showModal={props.showModal} 
            actions={props.actions}  
            title={props.title} 
            description={props.description} 
            toggleModal={props.toggleModal} 
        />
    )
}

const mapStateToProps = (state) => {
    return {
        showModal: state.modal.showModal,
        title: state.modal.title,
        description: state.modal.description,
        actions: state.modal.actions
    }
}

export default connect(mapStateToProps, { toggleModal })(ModalContainer);