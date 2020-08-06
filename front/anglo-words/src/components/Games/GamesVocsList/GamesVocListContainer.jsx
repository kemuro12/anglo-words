import React, { useEffect } from 'react';
import GamesVocList from './GamesVocList';
import { connect } from 'react-redux';
import { toggleSelectedVoc } from '../../../redux/games-reducer';
import { getVocsByUserId } from '../../../redux/voc-reducer';

const GamesVocListContainer = (props) => {
    
    useEffect(() => {
        //Для запроса всех словарей
        if(props.vocs.length <= 5) props.getVocsByUserId(props.userId, 0)
    },[props.vocs])

    return (
        <GamesVocList 
            selectedVocs={props.selectedVocs}  
            toggleSelectedVoc={props.toggleSelectedVoc}
            vocs={props.vocs}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        selectedVocs: state.games.selectedVocs,
        vocs: state.vocabulary.vocs,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { toggleSelectedVoc, getVocsByUserId })(GamesVocListContainer);