import React, { useEffect } from 'react';
import Vocabulary from './Vocabulary';
import { connect } from 'react-redux';
import { getVocsByUserId, addNewVoc, deleteVoc, updateVoc } from '../../redux/voc-reducer';
import { compose } from 'redux';
import { toggleModal } from '../../redux/modal-reducer';

const VocabularyContainer = (props) => {
    useEffect(() => {
        props.getVocsByUserId(props.user.userId)
    }, [props.user.userId])

    return (
        <Vocabulary 
            user={props.user} 
            addNewVoc={props.addNewVoc} 
            isLoading={props.isLoading}
            getVocsByUserId={props.getVocsByUserId}
            currentPage={props.currentPage}
            pageOptions={props.pageOptions}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        user: {
            userId: state.auth.userId,
            image: state.auth.image
        },
        vocs: state.vocabulary.vocs,
        currentPage: state.vocabulary.currentPage,
        pageOptions: state.vocabulary.pageOptions,
        isLoading: state.preloader.isLoading
    }
}

export default compose(
    connect(mapStateToProps, { getVocsByUserId, addNewVoc, deleteVoc, updateVoc, toggleModal })
)(VocabularyContainer);