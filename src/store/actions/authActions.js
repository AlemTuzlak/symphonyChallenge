import api from '../../api';

import {  
    ACTION_REGISTRATION_IN_PROGRESS,
    ACTION_REGISTRATION_COMPLETED,
    ACTION_LOGIN_IN_PROGRESS,
    ACTION_LOGIN_COMPLETED,
    ACTION_SET_USER_INFORMATION,
    ACTION_LOGOUT_USER,
    ACTION_AUTH_401_ERROR,
    ACTION_AUTH_500_ERROR,
    ACTION_REMOVE_AUTH_ERRORS,
    ACTION_REGISTRATION_COMPLETE
} from './authActionsList';

import { setAccessToken } from '../../helpers/localStorageHandlers';

export const register = (email, username, password, first_name, last_name) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_REGISTRATION_IN_PROGRESS());
            const response = await api.register(email, username, password, first_name, last_name);
            if(response && response.data){
                dispatch(ACTION_REGISTRATION_COMPLETE());
                dispatch(ACTION_REGISTRATION_COMPLETED());
            }
        } catch(error) {
            if(error.status === 401){
                dispatch(ACTION_AUTH_401_ERROR());
            } 
            else {
                dispatch(ACTION_AUTH_500_ERROR());
            }

            dispatch(ACTION_REGISTRATION_COMPLETED());
        }
    }
}

export const login = (email, username, password) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_LOGIN_IN_PROGRESS());
            const response = await api.login(email, username, password);
            if(response && response.data){
                dispatch(ACTION_SET_USER_INFORMATION(response.data.username, response.data.token, response.data.user_id, response.data.email, response.data.first_name, response.data.last_name, response.data.is_admin))
                setAccessToken(response.data.token);
                dispatch(ACTION_LOGIN_COMPLETED());
            }
        } catch(error) {
            if(error.status === 400){
                dispatch(ACTION_AUTH_401_ERROR());
            } 
            else {
                dispatch(ACTION_AUTH_500_ERROR());
            }
            dispatch(ACTION_LOGIN_COMPLETED());
        }
    }
}
//? Logs the user out
export const logout = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_LOGOUT_USER());
    }
}

export const removeAuthErrors = () => {
    return (dispatch, getState) => {
        dispatch(ACTION_REMOVE_AUTH_ERRORS());
    }
}

