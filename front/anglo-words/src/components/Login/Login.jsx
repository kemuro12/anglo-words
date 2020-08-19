import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, CheckBox } from '../templates/FormsControls/FormsControls';
import style from '../templates/FormsControls/FormsControls.module.css';
import styles from './Login.module.css';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, registration } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';

const maxLength6 = maxLengthCreator(6);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    placeholder="Логин"
                    className={styles.input}
                    name="login"
                    autoComplete="off"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    placeholder="Пароль" 
                    className={styles.input}
                    name="pass" 
                    autoComplete="off"
                    type="password" 
                    component={Input} 
                    validate={[requiredField, maxLength6]}
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
                <Button onClick={() => props.setRegistrPage(true)} size="small" >Зарегистрироваться</Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)

const RegistrForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    placeholder="Логин"
                    className={styles.input}
                    name="login"
                    autoComplete="off"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    placeholder="Пароль" 
                    className={styles.input}
                    name="pass" 
                    autoComplete="off"
                    type="password" 
                    component={Input} 
                    validate={[requiredField, maxLength6]}
                />
            </div>

            { props.error &&
            <div className={style.formSummaryError}>
                {props.error}
            </div>
            }

            <div>
                <Button className={styles.registrButton} onClick={props.submit} variant="contained" size="medium" color="primary" >Зарегистрироваться</Button>
            </div>
        </form>
    )
}

const RegistrReduxForm = reduxForm({
    form: "registration"
})(RegistrForm)

const Login = (props) => {

    const [registrPage, setRegistrPage] = useState(false)

    const onSubmitLogin = (formData) => {
        props.login(formData.login, formData.pass, formData.rememberMe);
    }

    const onSubmitRegistration = (formData) => {
        props.registration(formData.login, formData.pass)
    }
    
    if(props.isAuth){
       return <Redirect to={"/"} /> 
    }

    return (
        <div>
            <Typography className={styles.header}>
                {!registrPage ? 
                "Вход" 
                : "Регистрация"}
            </Typography>
            {!registrPage ?
                <LoginReduxForm onSubmit={ onSubmitLogin } setRegistrPage={ setRegistrPage }/> 
            :
                <RegistrReduxForm onSubmit={ onSubmitRegistration } />
            }
                 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { login, registration })(Login);