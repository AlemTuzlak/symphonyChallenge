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


const initState = {
    isLoggedIn: false,
    registering: false,
    loggingIn: false,
    registrationComplete: false,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    userId: null,
    token: null,
    error: null,
    //! CHANGE TO FALSE FOR OTHER VIEW ON HOTEL PAGE
    isAdmin: true
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        case REGISTRATION_IN_PROGRESS: {
            return {
                ...state,
                registering: true
            }
        }

        case REGISTRATION_COMPLETED: {
            return {
                ...state,
                registering: false
            }
        }

        case REGISTRATION_COMPLETE: {
            return {
                ...state,
                registrationComplete: true
            }
        }

        case SET_USER_INFORMATION: {
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                userId: action.payload.userId,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isLoggedIn: true
            }
        }

        case LOGIN_IN_PROGRESS: {
            return {
                ...state,
                loggingIn: true
            }
        }

        case LOGIN_COMPLETED: {
            return {
                ...state,
                loggingIn: false
            }
        }

        case LOGOUT_USER: {
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                userId: null,
                token: null
            }
        }

   

        case AUTH_401_ERROR: {
            return {
                ...state,
                error: 401
            }
        }

        case AUTH_404_ERROR: {
            return {
                ...state,
                error: 404
            }
        }

        case AUTH_500_ERROR: {
            return {
                ...state,
                error: 500
            }
        }

        case REMOVE_AUTH_ERRORS: {
            return {
                ...state,
                error: null,
                registrationComplete: false
            }
        }

        default: {
            return state;
        }
    }
}

export default authReducer;