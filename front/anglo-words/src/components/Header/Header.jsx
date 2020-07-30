import React from 'react';
import styles from './Header.module.css';
import NavItem from './NavItem/NavItem';

const Header = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <span>Anglo-Words</span>
            </div>

            <div className={styles.navs}>
                <nav>
                    <NavItem path="/" title="Главная" currentPath={props.currentPath}/>
                    <NavItem path="/vocabulary" title="Мои словари" currentPath={props.currentPath}/>
                </nav>
                
                {!props.isAuth ? 
                    <NavItem path="/login" title="Логин" currentPath={props.currentPath}/>
                :
                    <NavItem path="/" title="Выйти" onClick={ props.logout } />
                }

                
            </div>
        </div>
    )
}

export default Header;