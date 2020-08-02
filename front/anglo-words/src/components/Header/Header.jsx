import React, { useState } from 'react';
import styles from './Header.module.css';
import NavItem from './NavItem/NavItem';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const onClickAvatar = (e) => {
        setAnchorEl(e.currentTarget);
    }   

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <span>Anglo-Words</span>
            </div>

            <div className={styles.navs}>
                <nav>
                    <NavItem path="/" title="Главная" currentPath={props.currentPath}/>
                    <NavItem path="/vocabulary" title="Мои словари" currentPath={props.currentPath}/>
                    <NavItem path="/games" title="Тренироваться" currentPath={props.currentPath}/>
                </nav>
                
                {!props.isAuth ? 
                    <NavItem path="/login" title="Логин" currentPath={props.currentPath}/>
                :
                    <div>
                        <Avatar src={props.image} onClick={ onClickAvatar } className={styles.avatar} alt="user-avatar" />
                        <Menu 
                            open={Boolean(anchorEl)} 
                            keepMounted
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            className={styles.avatarMenu}
                            transitionDuration={200}
                        >
                            <MenuItem>{props.login}</MenuItem>
                            <MenuItem>
                                <NavLink to={'/'} onClick={ () => {props.logout(); handleClose()} }>
                                    <span className={styles.logoutButton}>Выйти</span>
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </div> 
                }

                
            </div>
        </div>
    )
}

export default Header;