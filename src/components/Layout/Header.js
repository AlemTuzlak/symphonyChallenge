import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/symphony-logo.png';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

class Header extends Component {
    componentDidUpdate(prevProps){
        if(prevProps.isLoggedIn && !this.props.isLoggedIn){
            this.props.history.replace('/');
        }
    }
    render() {
        const activePath = this.props.location.pathname;

        return (
            <div id="header" className="header">
                <div className="header__logo_container">
                    <Link to="/">
                        <img src={logo} alt="logo" className="header__logo" />
                    </Link>
                </div>
                
                <div className="header__links">
                    
                   
                    {this.props.isLoggedIn ?
                    <React.Fragment>
                     <Link to="/dashboard">
                        <div className={`header__link ${activePath === '/dashboard' ? 'header__link--active' : ''}`}>
                            Dashboard
                        </div>
                    </Link>   
                    <Link to="/favorites">
                        <div className={`header__link ${activePath === '/favorites' ? 'header__link--active' : ''}`}>
                            Favorites
                        </div>
                    </Link>   
                    <div onClick={this.props.logout} className={`header__link ${activePath === '/logout' ? 'header__link--active' : ''}`}>
                        Logout
                    </div>
                    </React.Fragment>
                    :
                    <Link to="/">
                        <div className={`header__link ${activePath === '/' ? 'header__link--active' : ''}`}>
                            Login
                        </div>
                    </Link>}
                </div>
            </div>
        );
    }
    
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));