import React from 'react';
import styles from './Library.module.css';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';
import Preloader from '../templates/Preloader/Preloader';

const Library = (props) => {

    const History = useHistory();
  
    const formatDate = (date) => {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    const onClickOpen = (e) => {
        History.push(`/vocabulary/${e.currentTarget.dataset.id}`)
    }

    const onClickAdd = (e) => {
        props.copyVoc(e.currentTarget.dataset.id, props.userId)
    }

    const onRateChange = (e) => {
       let vocId = e.currentTarget.attributes['name'].value.slice(7);
       props.setRate(vocId, props.userId, e.currentTarget.value)
    }

    const rates = {};
    props.rates.forEach( r => rates[r.vocId] = r.rate)

    const allVocs = props.allVocs.filter(voc => !voc.isPrivate && voc.wordsCount > 0).map(voc => 
    <Grid key={voc.id} xs={12} sm={6} md={4} lg={3} item > 
        <Paper className={styles.vocBlock} elevation={3}>
            <div className={styles.date}>Создан { formatDate(new Date(voc.date)) }</div>
            <Typography className={styles.vocTitle}>
                { voc.title }
            </Typography>

            <Typography className={styles.vocDescription}>
                { voc.description }
            </Typography>

            <Typography className={styles.row}>
                Слов: <b>{ voc.wordsCount }</b>
            </Typography>

            <Typography className={styles.row}>
                Автор: <b>{ voc.ownerNickname }</b>
            </Typography>

            <Typography className={styles.row}>
                Рейтинг: <Rating className={styles.stars} value={voc.rate} precision={0.5} readOnly/>
            </Typography>

            {props.isAuth ?
                <Typography className={styles.row}>
                    Моя оценка: <Rating className={styles.stars} name={"rating_" + voc.id} value={ rates[voc.id] || 0 } precision={0.5} test={ voc.id } onChange={ onRateChange } />
                </Typography>
            :""}
            
            
            <Typography className={styles.buttons}>
                <Button size="medium" variant="contained" className={styles.buttonLook} data-id={voc.id} onClick={ onClickOpen } >
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

            { props.isLoading ? <Preloader />
            :
                <Grid container spacing={2} className={styles.mainBlock}>
                    { allVocs }
                </Grid>
            }   

            
        </div>
    )
}

export default Library