import React, { useState } from 'react';
import styles from './Header.module.css';
import NavItem from './NavItem/NavItem';
import { Avatar, Menu, MenuItem, Container, Toolbar, IconButton, Typography, AppBar, Hidden, Drawer, List, ListItem, Icon } from '@material-ui/core';
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

    const links_header = props.links.map((link, count) => 
        link.authShield && !props.isAuth ? 
        ""
        : <NavItem key={count} path={ link.path } title={ link.title } currentPath={props.currentPath} icon={ link.icon } />
    )

    const links_header_mobile = props.links.map((link, count) => 
        link.authShield && !props.isAuth ? 
        "" 
        :<ListItem  key={count} button className={styles.burgerItem + " " + (link.path === props.currentPath ? styles.currentPath : "")}>
            <NavItem key={count} mobile={true} path={ link.path } title={ link.title } currentPath={props.currentPath} icon={ link.icon } onClick={ onToggleMobileMenuOpen } />
        </ListItem>
    )


    return (
        <AppBar className={styles.header}>

            <Drawer open={ mobileMenuOpen } onClose={ onToggleMobileMenuOpen } >
                <List>
                    { links_header_mobile }

                    {props.isAuth ? 
                        <ListItem button className={styles.burgerItem}>
                            <NavItem mobile={true} path={ '/' } title={ 'Выйти' } currentPath={props.currentPath} icon={ 'account_box' } onClick={() => {props.logout(); onToggleMobileMenuOpen()}  } />
                        </ListItem>
                    :
                        <ListItem button className={styles.burgerItem + " " + ('/login' === props.currentPath ? styles.currentPath : "")}>
                            <NavItem mobile={true} path={ '/login' } title={ 'Войти' } currentPath={props.currentPath} icon={ 'account_box' } onClick={ onToggleMobileMenuOpen } />
                        </ListItem>
                    }
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
                            { links_header }        
                        </Hidden> 
                    </nav>
                
                {!props.isAuth ? 
                    <Hidden smDown>
                        <NavItem path="/login" title="Войти" currentPath={props.currentPath} icon={ "account_circle" } />
                    </Hidden>   
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