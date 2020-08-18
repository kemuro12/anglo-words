import React from 'react';
import styles from './Library.module.css';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Library = (props) => {

    const History = useHistory();
  
    const onClickOpen = (e) => {
        History.push(`/vocabulary/${e.currentTarget.dataset.id}`)
    }

    const onClickAdd = (e) => {
        props.copyVoc(e.currentTarget.dataset.id, props.userId)
    }

    const allVocs = props.allVocs.filter(voc => !voc.isPrivate).map(voc => 
    <Grid key={voc.id} xs={12} sm={6} md={4} lg={3} item > 
        <Paper className={styles.vocBlock} elevation={3}>
            <Typography className={styles.vocTitle}>
                { voc.title }
            </Typography>

            <Typography className={styles.vocDescription}>
                Описание: { voc.description }
            </Typography>

            <Typography className={styles.vocDescription}>
                Слов: <b>{ voc.wordsCount }</b>
            </Typography>
            
            <Typography className={styles.buttons}>
                <Button size="small" variant="contained" className={styles.buttonLook} data-id={voc.id} onClick={ onClickOpen } >
                    Открыть
                </Button>
                {props.isAuth ? 
                <Button size="small" variant="contained" className={styles.buttonAdd} data-id={voc.id} onClick={ onClickAdd } >
                    Добавить
                </Button>
                :""}
            </Typography>
            
        </Paper> 
    </Grid>)

    return (
        <div > 
            <Typography className={styles.headerBlock}>
                <b>Библиотека словарей</b>
            </Typography>

            <Grid container spacing={5} className={styles.mainBlock}>
                { allVocs }
            </Grid>
        </div>
    )
}

export default Library