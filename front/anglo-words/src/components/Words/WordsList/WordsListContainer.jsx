import React from 'react';
import WordsList from './WordsList';
import { connect } from 'react-redux';
import { toggleModal } from '../../../redux/modal-reducer';
import { deleteWord, updateWord, getWordsByVocId } from '../../../redux/words-reducer';

const WordsListContainer = (props) => {
    return (
        <WordsList 
            words={props.words}
            toggleModal={props.toggleModal}
            deleteWord={props.deleteWord}
            updateWord={props.updateWord}
            voc={props.voc}
            currentPage={props.currentPage}
            getWordsByVocId={props.getWordsByVocId}
            isAuth={props.isAuth}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        words: state.words.words,
        isAuth:state.auth.isAuth,
        currentPage: state.words.currentPage,
        voc: state.words.voc
    }
}

export default connect(mapStateToProps, { toggleModal, deleteWord, updateWord, getWordsByVocId })(WordsListContainer);