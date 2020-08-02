import React from 'react';
import styles from './Games.module.css';
import { Typography, Card, Divider, Button } from '@material-ui/core';
import GamesVocListContainer from './GamesVocsList/GamesVocListContainer';
import GameModeListContainer from './GameModesList/GameModeListContainer';
import Game from './Game/Game';

const Games = (props) => {
   
    if(props.words.length) return <Game words={props.words} />

    return (
        <div className={styles.main}>
            <Card className={styles.gamesBlock}>
                <Typography className={styles.headerBlock}>
                    Выберите словари для тренировки
                </Typography>
                <Divider />
                
                <GamesVocListContainer />

            </Card>

            <Card className={styles.gamesBlock}>
                <Typography className={styles.headerBlock}>
                    Выберите режим
                </Typography>
                <Divider />
                
                <GameModeListContainer />

                <div className={styles.buttonContainer}>
                    <Button 
                        onClick={ () => props.initializeGame(props.gameModes.find(mode => mode.id === props.selectedGameMode), props.selectedVocs ) }
                        disabled={ !props.selectedVocs.length && true }  
                        className={ props.selectedVocs.length ? styles.buttonStart : styles.disabledButton}
                    >
                            Начать игру
                    </Button>
                </div>
            </Card>

        </div>
        
    )
}

export default Games;