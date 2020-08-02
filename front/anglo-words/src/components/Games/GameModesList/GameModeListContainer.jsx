import React from 'react';
import GameModesList from './GameModesList';
import { setGameMode } from '../../../redux/games-reducer';
import { connect } from 'react-redux';

const GameModesListContainer = (props) => {
    return (
        <GameModesList 
            setGameMode={props.setGameMode}
            gameModes={props.gameModes}
            selectedGameMode={props.selectedGameMode}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        gameModes: state.games.gameModes,
        selectedGameMode: state.games.selectedGameMode
    }
}

export default connect(mapStateToProps, { setGameMode })(GameModesListContainer);