import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, CheckBox } from '../templates/FormsControls/FormsControls';
import style from '../templates/FormsControls/FormsControls.module.css';
import { requiredField } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    placeholder="Логин"
                    name="login"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    placeholder="Пароль" 
                    name="pass" 
                    type="password" 
                    component={Input} 
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    type="checkbox" 
                    name="rememberMe"
                    label="Запомнить"
                    color="primary" 
                    component={CheckBox} 
                />
            </div>


            { props.error &&
            <div className={style.formSummaryError}>
                {props.error}
            </div>
            }

            <div>
                <Button onClick={props.submit} variant="contained" size="small" color="primary" >Войти</Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.pass, formData.rememberMe);
    }
    
    if(props.isAuth){
       return <Redirect to={"/"} /> 
    }

    return (
        <div>
            <h2>Форма входа</h2>
            <LoginReduxForm onSubmit={ onSubmit } />      
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { login })(Login);