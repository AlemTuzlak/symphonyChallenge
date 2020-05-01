import React, { Component } from 'react';
import Input from '../Global/Input';
import Button from '../Global/Button';

import FormValidator from '../../validation/validator';
import { notEmpty, passwordValid } from '../../validation/validationRules';
import { createValidationObject } from '../../helpers/validationHelpers';
import { login } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import keyIcon from '../../assets/icons/key.svg';
import userIcon from '../../assets/icons/user.svg';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.initializeValidator();

        this.state = {
            loginCredential: '',
            loginCredentialVisited: false,
            password: '',
            passwordVisited: false,
            firstSubmit: true,
            validation: this.validator.valid()
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.history.replace('/dashboard');
            window.location.reload();
        }
    }

    render(){
        const { validation, loginCredential, loginCredentialVisited, password, passwordVisited, firstSubmit } = this.state;
        const { loggingIn, error } = this.props;
        
        const validationFields = createValidationObject(
            validation, 
            firstSubmit, 
            ['loginCredential', 'password'], 
            [loginCredentialVisited, passwordVisited]
        );
        return (
            <React.Fragment>
                <div className="login-form">
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={error === 401 || validationFields.loginCredential}
                        validationMessage={error === 401 ? 'The password/username you provided is incorrect!' : (validationFields.loginCredential ? validation.loginCredential.message : null)}
                        placeholder="Username*"
                        name="loginCredential"
                        value={loginCredential}
                        type="loginCredential"
                        icon={userIcon}
                    />
                   <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={error === 401 || validationFields.password}
                        validationMessage={error === 401 ? 'The password/username you provided is incorrect!' : (validationFields.password ? validation.password.message : null)}
                        placeholder="Password*"
                        name="password"
                        value={password}
                        type="password"
                        icon={keyIcon}
                    />
                </div>
                

                <Button loading={loggingIn} onClick={this.login} disabled={!validationFields.isValid && !firstSubmit} classes="button--login" text={this.props.determineFormField('Sign in', 'Register', 'Send')} color="yellow" />
            </React.Fragment>
        );
    }

    onChange = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    onBlur = (event) => {
        if(this.props.error){
            this.props.removeAuthErrors();
        }
        this.setState({
            [event.target.name]: event.target.value,
            [`${event.target.name}Visited`]: true
        }, () => {
            this.validateForm();
        })
    }

    login = (event) => {
        event.preventDefault();
        this.setState({
            firstSubmit: false
        }, () => {
            const isValid = this.validateForm();
            if(isValid){
                const { loginCredential, password } = this.state;
                this.props.login(loginCredential, loginCredential, password);
            }
        })
    }

    initializeValidator = () => {
        this.validator = new FormValidator([
            notEmpty('loginCredential', 'Email/Username can\'t be empty!'),
            notEmpty('password', 'Password cant\'t be empty!'),
            passwordValid('password', 'Password must be at least 8 characters long')
        ])
    }

    validateForm = () => {
        const validation = this.validator.validate(this.state);
        this.setState({
            validation: validation
        })
        return validation.isValid;
    }
}

const mapStateToProps = (state) => {
    return {
        logginIn: state.auth.logginIn,
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, username, password) => { dispatch(login(email, username, password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));