import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';
import { Icon } from '@material-ui/core';

const NavItem = (props) => {
    
    return (
        <NavLink to={props.path} onClick={ props.onClick } className={ props.mobile ? styles.navLink : "" }>
            {props.mobile ?
                <div className={styles.link_mobile}>
                    {props.icon ?
                        <Icon className={styles.icon_mobile}> {props.icon} </Icon>
                        :""
                    }
                    
                    {props.title}
                </div>  
            :
                <div className={styles.link + " " + (props.path === props.currentPath ? styles.currentPath : "")}>
                    {props.icon ?
                        <Icon className={styles.icon}> {props.icon} </Icon>
                        :""
                    }
                    
                    {props.title}
                </div>  
            }
            
        </NavLink> 
    )
}

export default NavItem;