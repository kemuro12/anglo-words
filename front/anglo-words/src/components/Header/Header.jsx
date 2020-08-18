import React, { useState } from 'react';
import styles from './Header.module.css';
import NavItem from './NavItem/NavItem';
import { Avatar, Menu, MenuItem, Container, Toolbar, IconButton, Typography, AppBar, Hidden, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const onClickAvatar = (e) => {
        setAnchorEl(e.currentTarget);
    }   

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onToggleMobileMenuOpen = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <AppBar className={styles.header}>

            <Drawer open={ mobileMenuOpen } onClose={ onToggleMobileMenuOpen } >
                <List>
                    <ListItem button className={styles.burgerItem}>
                        <NavLink to="/" onClick={ onToggleMobileMenuOpen }>
                            <Typography>
                                Главная
                            </Typography>
                        </NavLink>
                    </ListItem>

                    <ListItem button className={styles.burgerItem}>
                        <NavLink to="/library" onClick={ onToggleMobileMenuOpen }>
                            <Typography>
                                Библиотека
                            </Typography>
                        </NavLink>
                    </ListItem>

                    <ListItem button className={styles.burgerItem}>
                        <NavLink to="/vocabulary" onClick={ onToggleMobileMenuOpen }>
                            <Typography>
                                Мои словари
                            </Typography>
                        </NavLink>
                    </ListItem>

                    <ListItem button className={styles.burgerItem}>
                        <NavLink to="/games" onClick={ onToggleMobileMenuOpen }>
                            <Typography>
                                Тренироваться
                            </Typography>
                        </NavLink>
                    </ListItem>
                </List>
            </Drawer>

            <Container >
                <Toolbar className={styles.flexBlock}>

                    <Typography className={styles.logo}>
                        <Hidden mdUp>
                            <IconButton edge="start" color="inherit" onClick={ onToggleMobileMenuOpen }>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        Anglo-Words
                    </Typography>

                    <nav className={styles.nav}>
                        <Hidden smDown>
                            <NavItem path="/" title="Главная" currentPath={props.currentPath}/>
                            <NavItem path="/library" title="Библиотека" currentPath={props.currentPath}/>
                            {props.isAuth ? 
                                <>
                                    <NavItem path="/vocabulary" title="Мои словари" currentPath={props.currentPath}/>
                                    <NavItem path="/games" title="Тренироваться" currentPath={props.currentPath}/>
                                </>
                            :   
                                ""
                            }
                        </Hidden> 
                    </nav>
                
                {!props.isAuth ? 
                    <NavItem path="/login" title="Логин" currentPath={props.currentPath}/>
                :
                    <div className={styles.avatar}>
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

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;