import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const NavItem = (props) => {
    return (
        <NavLink to={props.path} onClick={ props.onClick }>
            <div className={styles.link + " " + (props.path === props.currentPath ? styles.currentPath : "")}>
                {props.title}
            </div>  
        </NavLink> 
    )
}

export default NavItem;