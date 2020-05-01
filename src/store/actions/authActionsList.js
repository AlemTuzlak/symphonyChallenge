import {
    REGISTRATION_IN_PROGRESS,
    REGISTRATION_COMPLETED,
    SET_USER_INFORMATION,
    LOGIN_IN_PROGRESS,
    LOGIN_COMPLETED,
    LOGOUT_USER,
    AUTH_401_ERROR,
    AUTH_404_ERROR,
    AUTH_500_ERROR,
    REMOVE_AUTH_ERRORS,
    REGISTRATION_COMPLETE
} from '../constants';
//? Registration endpoints
export const ACTION_REGISTRATION_COMPLETE = () => { return { type: REGISTRATION_COMPLETE }} 
export const ACTION_REGISTRATION_IN_PROGRESS = () => { return { type: REGISTRATION_IN_PROGRESS } };
export const ACTION_REGISTRATION_COMPLETED = () => { return { type: REGISTRATION_COMPLETED } };
//? Login endpoints
export const ACTION_LOGIN_IN_PROGRESS = () => { return { type: LOGIN_IN_PROGRESS } };
export const ACTION_LOGIN_COMPLETED = () => { return { type: LOGIN_COMPLETED } };
export const ACTION_SET_USER_INFORMATION = (user, token, userId, email, first_name, last_name, isAdmin) => { return { type: SET_USER_INFORMATION, payload: {
     user: user, 
     token: token, 
     userId: userId, 
     email: email, 
     first_name: first_name, 
     last_name: last_name, 
     isAdmin: isAdmin
    } } };

//? general authentication state handling
export const ACTION_LOGOUT_USER = () => { return { type: LOGOUT_USER } };
export const ACTION_AUTH_401_ERROR = (data) => { return { type: AUTH_401_ERROR, payload: data } };
export const ACTION_AUTH_404_ERROR = () => { return { type: AUTH_404_ERROR } };
export const ACTION_AUTH_500_ERROR = () => { return { type: AUTH_500_ERROR } };
export const ACTION_REMOVE_AUTH_ERRORS = () => { return { type: REMOVE_AUTH_ERRORS } };