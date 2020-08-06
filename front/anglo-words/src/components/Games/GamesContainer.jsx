import React, { useEffect } from 'react';
import Games from './Games';
import { connect } from 'react-redux';
import { getVocsByUserId } from '../../redux/voc-reducer';
import { initializeGame, initializeGamesPageToggle ,clearGame } from '../../redux/games-reducer';

const GamesContainer = (props) => {

    useEffect(() => {
        props.getVocsByUserId(props.userId, 0) 
        props.initializeGamesPageToggle();
    }, [props.userId])

    //willUnMount
    useEffect(() => () => {
        props.clearGame()
        props.initializeGamesPageToggle();
    }, [])

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
            isGameInitialize={props.isGameInitialize}
            isInitializePage={props.isInitializePage}
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
        isGameInitialize: state.games.isGameInitialize,
        isInitializePage:state.games.isInitializePage
    }
}

export default connect(mapStateToProps, { getVocsByUserId, initializeGame, initializeGamesPageToggle, clearGame })(GamesContainer);