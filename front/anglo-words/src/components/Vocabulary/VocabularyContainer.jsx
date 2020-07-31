import React, { useEffect } from 'react';
import Vocabulary from './Vocabulary';
import { connect } from 'react-redux';
import { getVocsByUserId, addNewVoc, deleteVoc, updateVoc } from '../../redux/voc-reducer';
import { compose } from 'redux';
import { toggleModal } from '../../redux/modal-reducer';

const VocabularyContainer = (props) => {
    useEffect(() => {
        props.getVocsByUserId(props.user.userId)
    }, [props.user.userVocs])

    return (
        <Vocabulary 
            user={props.user} 
            addNewVoc={props.addNewVoc} 
        />
    )
}

const mapStateToProps = (state) => {
    return {
        user: {
            userId: state.auth.userId,
            userVocs: state.auth.userVocs,
            image: state.auth.image
        },
        vocs: state.vocabulary.vocs
    }
}

export default compose(
    connect(mapStateToProps, { getVocsByUserId, addNewVoc, deleteVoc, updateVoc, toggleModal })
)(VocabularyContainer);