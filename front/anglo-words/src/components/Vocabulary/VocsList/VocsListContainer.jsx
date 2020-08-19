import React from 'react';
import VocsList from './VocsList';
import { connect } from 'react-redux';
import { updateVoc, deleteVoc, getVocsByUserId } from '../../../redux/voc-reducer';
import { toggleModal } from '../../../redux/modal-reducer';

const VocsListContainer = (props) => {

    return (
        <VocsList 
            vocs={props.vocs} 
            updateVoc={props.updateVoc}
            deleteVoc={props.deleteVoc}
            userId={props.userId}
            getVocsByUserId={props.getVocsByUserId}
            currentPage={props.currentPage}
            toggleModal={props.toggleModal}
            maxWords={props.maxWords}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        vocs: state.vocabulary.vocs,
        currentPage: state.vocabulary.currentPage,
        userId: state.auth.userId,
        maxWords: state.vocabulary.maxWords
    }
}

export default connect(mapStateToProps, {updateVoc, deleteVoc, toggleModal, getVocsByUserId})(VocsListContainer);