import React from 'react';
import { List } from '@material-ui/core';
import ListItemWithCheckbox from '../../templates/ListItemWithCheckbox/ListItemWithCheckbox';

const GameModesList = (props) => {
    
    const gameModes = props.gameModes.map( (gameMode, count) =>
        <ListItemWithCheckbox
            key={gameMode.id}
            num={count}
            selected={ gameMode.id === props.selectedGameMode ? true : false }
            item={gameMode}
            toggleSelectedCheckbox={ props.setGameMode }
        />
    )

    return (
        <List>
            { gameModes }
        </List>
    )
}

export default GameModesList;