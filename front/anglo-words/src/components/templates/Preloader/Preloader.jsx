import React from  'react';
import styles from './Preloader.module.css';
import { CircularProgress } from '@material-ui/core';

const Preloader = (props) => {
    return (
        <CircularProgress className={styles.preloader} />
    )
}

export default Preloader;