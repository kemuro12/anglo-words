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
                    <NavItem path="/" title="Главная"/>
                    <NavItem path="/vocabulary" title="Мои словари"/>
                </nav>

                <NavItem path="/login" title="Логин"/>
            </div>
        </div>
    )
}

export default Header;