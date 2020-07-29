import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../templates/FormsControls/FormsControls';
import style from '../templates/FormsControls/FormsControls.module.css';
import { requiredField } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    placeholder="login"
                    name="login"
                    component={Input}
                    validate={[requiredField]}
                />
            </div>

            <div>
                <Field 
                    placeholder="Password" 
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
                    component={Input} 
                /> remember me
            </div>

            { props.error &&
            <div className={style.formSummaryError}>
                {props.error}
            </div>
            }

            <div>
                <button>Login</button>
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
    
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={ onSubmit } />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { login })(Login);