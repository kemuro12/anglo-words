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
                isAuth={props.isAuth}
                logout={props.logout}
                currentPath={props.location.pathname}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {logout}),
    withRouter
)(HeaderContainer) 