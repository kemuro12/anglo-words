import React, { useEffect } from 'react';
import Games from './Games';
import { connect } from 'react-redux';
import { getVocsByUserId } from '../../redux/voc-reducer';
import { initializeGame, clearGame } from '../../redux/games-reducer';

const GamesContainer = (props) => {

    useEffect(() => {
        if(props.vocs.length !== props.user.userVocs.split(",").length) props.getVocsByUserId(props.user.userId) 
    }, [props.user.userVocs])

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
        />
    )
}

const mapStateToProps = (state) => {
    return {
        user: {
            userId: state.auth.userId,
            userVocs: state.auth.userVocs
        },
        gameModes: state.games.gameModes,
        selectedGameMode: state.games.selectedGameMode,
        vocs: state.vocabulary.vocs,
        selectedVocs: state.games.selectedVocs,
        words: state.games.words,
    }
}

export default connect(mapStateToProps, { getVocsByUserId, initializeGame, clearGame })(GamesContainer);