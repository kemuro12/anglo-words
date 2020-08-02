import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@material-ui/core';
import styles from './TableResult.module.css';

const TableResult = (props) => {
    console.log(props)
    return (
        <Grid container>
            <Grid item xs={12} lg={10} className={styles.gameBlock}>
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
                                        <TableCell>{word.word_eng}</TableCell>
                                        <TableCell align="center">{word.displayed_ru}</TableCell>
                                        <TableCell align="center">{word.word_ru}</TableCell>
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