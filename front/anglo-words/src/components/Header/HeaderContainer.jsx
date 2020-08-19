import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const HeaderContainer = (props) => {
    return (
        <div>
            <Header 
                links={props.links}
                isAuth={props.isAuth}
                image={props.image}
                login={props.login}
                logout={props.logout}
                currentPath={props.location.pathname}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        links: state.header.links,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        image: state.auth.image
    }
}

export default compose(
    connect(mapStateToProps, {logout}),
    withRouter
)(HeaderContainer) 