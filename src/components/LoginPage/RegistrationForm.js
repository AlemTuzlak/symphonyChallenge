import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Global/Input';
import Button from '../Global/Button';

import FormValidator from '../../validation/validator';
import { notEmpty, validEmailFormat, isAlphanumeric, passwordMatch, passwordValid } from '../../validation/validationRules';
import { createValidationObject } from '../../helpers/validationHelpers';
import { register } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

import emailIcon from '../../assets/icons/mail.svg';
import keyIcon from '../../assets/icons/key.svg';
import userIcon from '../../assets/icons/user.svg';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.initializeValidator();

        this.state = {
            email: '',
            emailVisited: false,
            firstName: '',
            firstNameVisited: false,
            lastName: '',
            lastNameVisited: false,
            username: '',
            usernameVisited: false,
            password: '',
            passwordVisited: false,
            confirmPassword: '',
            confirmPasswordVisited: false,
            firstSubmit: true,
            validation: this.validator.valid()
        }
    }

    render() {
        const { validation, email, emailVisited, firstName, firstNameVisited, password, passwordVisited, confirmPassword, confirmPasswordVisited, firstSubmit, username, usernameVisited, lastName, lastNameVisited } = this.state;
        const { registering, error } = this.props;
        
        const validationFields = createValidationObject(
            validation, 
            firstSubmit, 
            ['email', 'firstName', 'lastName', 'password', 'confirmPassword', 'username'], 
            [emailVisited, firstNameVisited, lastNameVisited, passwordVisited, confirmPasswordVisited, usernameVisited]
        );
        
        return (
            <React.Fragment>
                <div className="registration-form">
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.firstName}
                        validationMessage={validationFields.firstName ? validation.firstName.message : null}
                        placeholder="First name*"
                        name="firstName"
                        value={firstName}
                        icon={userIcon}
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.lastName}
                        validationMessage={validationFields.lastName ? validation.lastName.message : null}
                        placeholder="Last name*"
                        name="lastName"
                        value={lastName}
                        icon={userIcon}
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.username}
                        validationMessage={error === 401 ? 'Email/Username Username already exists' : (validationFields.username ? validation.username.message : null)}
                        placeholder="Username*"
                        name="username"
                        value={username}
                        icon={userIcon}
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={error === 401 || validationFields.email}
                        validationMessage={error === 401 ? 'Email/Username already exists' : (validationFields.email ? validation.email.message : null)}
                        placeholder="Email*"
                        name="email"
                        value={email}
                        type="email"
                        icon={emailIcon}
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.password}
                        validationMessage={validationFields.password ? validation.password.message : null}
                        placeholder="Password*"
                        name="password"
                        value={password}
                        type="password"
                        icon={keyIcon}
                        />
                    <Input
                        changeHandler={this.onChange}
                        blurHandler={this.onBlur}
                        inputInvalid={validationFields.confirmPassword}
                        validationMessage={validationFields.confirmPassword ? validation.confirmPassword.message : null}
                        placeholder="Confirm Password*"
                        name="confirmPassword"
                        value={confirmPassword}
                        type="password"
                        icon={keyIcon}
                        />
                </div>

            
                <Button loading={registering} onClick={this.register} disabled={(!validationFields.isValid && !firstSubmit) || registering} classes="button--login" text={this.props.determineFormField('Sign in', 'Register', 'Send')} color="yellow" />
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

    register = (event) => {
        event.preventDefault();
        this.setState({
            firstSubmit: false
        }, () => {
            const isValid = this.validateForm();
            if(isValid){
                const { email, username, password, firstName, lastName } = this.state;
                this.props.register(email, username, password, firstName, lastName);
            }
        })
    }

    initializeValidator = () => {
        this.validator = new FormValidator([
            notEmpty('email', 'Email can\'t be empty!'),
            validEmailFormat('email', 'The input you provided is not a valid email!'),
            notEmpty('firstName', 'First name can\'t be empty!'),
            isAlphanumeric('firstName', 'First name can contain only letters and numbers!'),
            notEmpty('lastName', 'Last name can\'t be empty!'),
            isAlphanumeric('lastName', 'Last name can contain only letters and numbers!'),
            notEmpty('password', 'Password can\'t be empty!'),
            notEmpty('confirmPassword', 'Password confirmation can\'t be empty!'),
            passwordMatch('confirmPassword', this.state, 'Passwords must match!'),
            passwordValid('password', 'Password must be at least 8 characters long'),
            passwordValid('confirmPassword', 'Password confirmation must be at least 8 characters long')
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
        registering: state.auth.registering,
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, username, password, firstName, lastName) => { dispatch(register(email, username, password, firstName, lastName))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));