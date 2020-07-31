import React, { useEffect } from  'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Words from './Words';
import { withRouter } from 'react-router-dom';
import { getVocById, getWordsByVocId, addNewWord } from '../../redux/words-reducer';

const WordsContainer = (props) => {
    useEffect(() => {
        if(!props.voc) props.getVocById(props.match.params.vocId)
        else if(props.voc.id !== props.match.params.vocId) props.getVocById(props.match.params.vocId)
        props.getWordsByVocId(props.match.params.vocId)
        
    }, [props.match.params.vocId])

    return (
        <Words addNewWord={props.addNewWord} voc={props.voc} urlVocId={props.match.params.vocId} />
    )
}

const mapStateToProps = (state) => {
    return {
        voc: state.words.voc
    }
}

export default compose(
    connect(mapStateToProps, { getVocById, getWordsByVocId, addNewWord }),
    withRouter
)(WordsContainer)