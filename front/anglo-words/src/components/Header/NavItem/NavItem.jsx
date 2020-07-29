import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const NavItem = (props) => {
    return (
        <NavLink to={props.path}>
            <div className={styles.link}>
                {props.title}
            </div>  
        </NavLink> 
    )
}

export default NavItem;