import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Comp) => {
    class HOC extends React.Component {
        render (props) {
            if (!this.props.isAuth) return <Redirect to={'/'} />
            return <Comp {...this.props} />
        }
    }

    return connect(mapStateToProps)(HOC)
}