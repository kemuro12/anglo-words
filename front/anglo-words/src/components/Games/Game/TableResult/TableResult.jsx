import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Button } from '@material-ui/core';
import styles from './TableResult.module.css';

const TableResult = (props) => {
    let correctAnswers = 0;
    props.words.forEach(w => w.correct && correctAnswers++)

    let percent = Math.round((correctAnswers / props.words.length) * 100);

    let resultWord
    if(percent === 100) resultWord = "Идеально!"
    else if (percent > 70) resultWord = "Отличный результат!"
    else if (percent > 50) resultWord = "Неплохой результат!"
    else resultWord = "Нужно попробовать еще раз!"

    const onClickEndGame = () => {
        props.clearGame();
    }

    return (
        <Grid container>
            <Grid item xs={12} lg={10} className={styles.gameBlock}>
                <Button size="small" style={{color:'red'}} onClick={ onClickEndGame }>Вернуться</Button>
                <div>
                    <h3>{ correctAnswers } / { props.words.length } ({ percent }%) - { resultWord }</h3>
                </div>
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Слово</TableCell>
                                <TableCell align="center">Введенное</TableCell>
                                <TableCell align="center">Верное</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                props.words.map((word,counter) => 
                                    <TableRow key={counter} className={ word.correct ? styles.true : styles.false }>
                                        <TableCell>{counter + 1}</TableCell>
                                        <TableCell>{word.main}</TableCell>
                                        <TableCell align="center">{word.inputed}</TableCell>
                                        <TableCell align="center">{word.answer}</TableCell>
                                    </TableRow>
                                )    
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        
    )
}

export default TableResult;