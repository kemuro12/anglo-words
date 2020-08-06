import React, { useState } from 'react';
import styles from './Games.module.css';
import { Typography, Card, Divider, Button, RadioGroup, FormControlLabel, Radio, Grid } from '@material-ui/core';
import GamesVocListContainer from './GamesVocsList/GamesVocListContainer';
import GameModeListContainer from './GameModesList/GameModeListContainer';
import Preloader from '../templates/Preloader/Preloader';
import Game from './Game/Game';

const Games = (props) => {

    const [mainLanguage, setMainLanguage] = useState("eng")
  
    if(props.isInitializedLoading) return <Preloader size="large" />

    if(props.words.length) return <Game words={props.words} clearGame={props.clearGame}/>

    const onRadioChange = () => {
        if(mainLanguage === "eng") setMainLanguage("ru")
        else setMainLanguage("eng")
    }

    let wordsCount = 0

    props.selectedVocs.forEach(s => {
        wordsCount += props.vocs.find(v => v.id === s).wordsCount
    })

    return (
        <Grid container className={styles.main} spacing={3}>
            <Grid item xs={12} md={6}>
                <Card className={styles.fullWidth}>
                    <Typography className={styles.headerBlock}>
                        <b>Выберите словари для тренировки</b>
                    </Typography>
                    <Divider />
                
                    {props.isLoading ? 
                        <Preloader size="small"/>
                    :
                        <GamesVocListContainer />
                    }
                    
                </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Card className={styles.fullWidth}>
                    <Typography className={styles.headerBlock}>
                        <b>Выберите режим</b>
                    </Typography>
                    <Divider />
                    
                    {props.isLoading ? 
                        <Preloader size="small"/>
                    :
                    <>
                        <GameModeListContainer />

                        <RadioGroup row name="main" onChange={ onRadioChange } value={ mainLanguage }>
                            <Typography className={styles.typText}>
                                Спрашивать
                            </Typography>
                            <FormControlLabel value="eng" label="eng" control={<Radio color="default" className={ mainLanguage === "eng" ? styles.radio : ""} />} />
                            <FormControlLabel value="ru" label="ru" control={<Radio color="default" className={ mainLanguage === "ru" ? styles.radio : ""} />} />
                        </RadioGroup>

                        <Typography className={styles.typText}>
                            { props.selectedVocs.length ? 
                                <span>Всего слов: <b>{ wordsCount }</b></span>
                            :
                                ""
                            }
                        
                        </Typography>

                        <div className={styles.buttonContainer}>
                            <Button 
                                onClick={ () => props.initializeGame(props.gameModes.find(mode => mode.id === props.selectedGameMode), props.selectedVocs, mainLanguage ) }
                                disabled={ !props.selectedVocs.length && true }  
                                className={ props.selectedVocs.length ? styles.buttonStart : styles.disabledButton}
                            >
                                    Начать игру
                            </Button>
                        </div>
                    </>
                    }
                    
                   
                </Card>
            </Grid>
           
        </Grid> 
    )
}

export default Games;