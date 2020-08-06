import React, { useEffect } from 'react';
import Games from './Games';
import { connect } from 'react-redux';
import { getVocsByUserId } from '../../redux/voc-reducer';
import { initializeGame, clearGame } from '../../redux/games-reducer';

const GamesContainer = (props) => {

    useEffect(() => {
        props.getVocsByUserId(props.userId) 
    }, [props.userId])

    //willUnMount
    useEffect(() => () => props.clearGame(), [])

    return (
        <Games 
            selectedVocs={props.selectedVocs} 
            gameModes={props.gameModes}
            selectedGameMode={props.selectedGameMode}
            initializeGame={props.initializeGame}
            words={props.words}
            clearGame={props.clearGame}
            vocs={props.vocs}
            isLoading={props.isLoading}
            isInitializedLoading={props.isInitializedLoading}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        gameModes: state.games.gameModes,
        selectedGameMode: state.games.selectedGameMode,
        vocs: state.vocabulary.vocs,
        selectedVocs: state.games.selectedVocs,
        words: state.games.words,
        isLoading: state.preloader.isLoading,
        isInitializedLoading: state.games.isInitializedLoading
    }
}

export default connect(mapStateToProps, { getVocsByUserId, initializeGame, clearGame })(GamesContainer);