import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../Global/Button';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import registerBackground from '../../assets/images/register-splash.jpg';
import logo from '../../assets/images/symphony-logo.png';

import { removeAuthErrors } from '../../store/actions/authActions';

class LoginPage extends Component {
    state = {
        form: ''
    }

    componentDidMount() {
        if(this.props.isLoggedIn){
            this.props.history.replace('/dashboard')
        }
        
    }
    componentDidUpdate(prevProps){
        
        if(this.props.registrationComplete && !prevProps.registrationComplete){
            this.setState({
                form: 'login'
            })
        }
    }
    render() {
        const { error, registering, loggingIn } = this.props;

        return (
                <div className="login">
                    <div className={`login__top-box login__top-box${this.determineClass()} `} />
                    <div className={`login__bottom-box login__bottom-box${this.determineClass()} `} />
                    <div className="login__main-container">
                        <div className={`login__switch-box login__switch-box${this.determineClass()}`}>
                            <div className="login__switch-box__overlay" />
                            <img src={registerBackground} alt="login-background" className="login__switch-box__img" />
                            <div className="login__switch-box__content">
                                <h1 className="login__switch-box__title">
                                    {
                                        this.isLoginForm() ? 'Welcome back !' : this.createRegisterTitle()
                                    }
                                    <hr className="white-line login__switch-box__line" />
                                </h1>
                                
                                <p className="login__switch-box__description"> 
                                    {
                                        this.isLoginForm() ? 
                                        'Use this form on the right to fill in your user data and log back into your account '
                                        : 'Wondering what are the benefits of registering? You will gain access to your very own personalized dashboard add hotels to favorites etc.'
                                    }
                                </p>
                                <p className="login__switch-box__description"> 
                                    {
                                        this.isLoginForm() ? 
                                        "Don't have an account yet? That's not a problem! Click the button below to switch to the register form and fill the required info there to join our growing family!" :
                                        "Already have an account? Click the button below and you will be switched to the login form!"
                                    }
                                </p>
                                <Button disabled={registering || loggingIn} name={this.isLoginForm() ? 'register' : 'login'} text={this.isLoginForm() ? 'Register' : 'Login'} onClick={this.changeForm} color="black" />
                            </div>
                        </div>
                        <div className={`login__container login__container${this.determineClass()}`}>
                            <img src={logo} alt="logo" className="login__container__logo" />
                            <h2 className="login__container__title">
                                {this.determineFormField('Sign in', 'Create an account')}
                            </h2>
                           
                            
                            <form className="login__container__form">
                                {this.determineFormField(
                                <LoginForm removeAuthErrors={this.props.removeAuthErrors} error={error} changeForm={this.changeForm} isLoginForm={this.isLoginForm} determineFormField={this.determineFormField} />, 
                                <RegistrationForm removeAuthErrors={this.props.removeAuthErrors} error={error} changeForm={this.changeForm} isLoginForm={this.isLoginForm} determineFormField={this.determineFormField} />) }
                            </form>
                            <p className="login__container__privacy">
                                <span className="login__container__privacy--clickable">
                                    Privacy Policy
                                </span> 
                                &nbsp; &bull; &nbsp;
                                <span className="login__container__privacy--clickable">
                                    Terms & Conditions
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
        );
    }


    changeForm = (event) => {
        const value = event.target.name ? event.target.name : event.target.id;
        this.props.removeAuthErrors();
        this.setState({
            form: value,
        })
    }

    determineClass = () => {
        const { form } = this.state;

        if(form === 'reset') return '--password';

        return `--${form}`;
    }

    determineFormField = (login, register) => {
        const { form } = this.state;
       
        switch (form) {
            case 'login': {
                return login
            }
            case 'register': {
                return register;
            }
            default: {
                return login
            }
        }
        
    }
    isLoginForm = () => {
        const { form } = this.state;

        return (form === 'login' || form === '')
    }
    createRegisterTitle = () => {
        return (
            <div>
                Welcome to <span className="white-text">HotelsApp</span>!
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isLoggedIn: state.auth.isLoggedIn,
        registrationComplete: state.auth.registrationComplete,
        registering: state.auth.registering,
        loggingIn: state.auth.loggingIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeAuthErrors: () => { dispatch(removeAuthErrors()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));