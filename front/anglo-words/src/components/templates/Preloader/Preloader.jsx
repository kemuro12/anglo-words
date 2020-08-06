import React from  'react';
import styles from './Preloader.module.css';
import { CircularProgress } from '@material-ui/core';

const Preloader = (props) => {
    return (
        <CircularProgress className={props.size === "small" ? styles.small : props.size === "medium" ? styles.medium : styles.large } />
    )
}

export default Preloader;