//* -------------------------------------------------------------- //
//*                     HOTEL ENDPOINT CONSTANTS                   //
//* -------------------------------------------------------------- //
//? Constants for fetching multiple hotels
export const FETCHING_HOTELS_IN_PROGRESS = 'FETCHING_HOTELS_IN_PROGRESS';
export const FETCHING_HOTELS_COMPLETED = 'FETCHING_HOTELS_COMPLETED';
export const STORE_FETCHED_HOTELS = 'STORE_FETCHED_HOTELS';
export const STORE_ADDITIONAL_HOTELS = 'STORE_ADDITIONAL_HOTELS';
export const STORE_FETCHED_FAVORITE_HOTELS = 'STORE_FETCHED_FAVORITE_HOTELS';
//? Constants for fetching hotel reviews
export const FETCHING_REVIEWS_IN_PROGRESS = 'FETCHING_REVIEWS_IN_PROGRESS';
export const FETCHING_REVIEWS_COMPLETED = 'FETCHING_REVIEWS_COMPLETED';
//? Constants for handling a single hotel
export const FETCHING_HOTEL_IN_PROGRESS = 'FETCHING_HOTEL_IN_PROGRESS'; 
export const FETCHING_HOTEL_COMPLETED = 'FETCHING_HOTEL_COMPLETED';
export const STORE_FETCHED_HOTEL = 'STORE_FETCHED_HOTEL';
export const REMOVE_HOTEL = 'REMOVE_HOTEL';
//? General hotel reducer constants
export const CLEAR_HOTEL_REDUCER = 'CLEAR_HOTEL_REDUCER';
export const SET_HOTEL_FILTERS = 'SET_HOTEL_FILTERS';
export const SET_HOTEL_PAGE = 'SET_HOTEL_PAGE';
export const SET_HOTEL_TYPE = 'SET_HOTEL_TYPE';
//? Setting a hotel to favorite
export const SET_HOTEL_TO_FAVORITE_IN_PROGRESS = 'SET_HOTEL_TO_FAVORITE_IN_PROGRESS';
export const SET_HOTEL_TO_FAVORITE_COMPLETED = 'SET_HOTEL_TO_FAVORITE_COMPLETED';
//? Creating/editing hotel
export const SET_EDITING_HOTEL_IN_PROGRESS = 'SET_EDITING_HOTEL_IN_PROGRESS';
export const SET_EDITING_HOTEL_COMPLETED = 'SET_EDITING_HOTEL_COMPLETED';

//* -------------------------------------------------------------- //
//*                    AUTH ENDPOINT CONSTANTS                     //
//* -------------------------------------------------------------- //
//? Constants for handling registration endpoint
export const REGISTRATION_IN_PROGRESS = 'REGISTRATION_IN_PROGRESS';
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_COMPLETE = 'REGISTRATION_COMPLETE';
//? Constants for handling login endpoint
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
//? Constants for handling sending reset password endpoint
export const SEND_RESET_PASSSWORD_IN_PROGRESS = 'SEND_RESET_PASSSWORD_IN_PROGRESS';
export const SEND_RESET_PASSSWORD_COMPLETED = 'SEND_RESET_PASSSWORD_COMPLETED';
export const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';
export const RESET_PASSWORD_MODAL_OPEN = 'RESET_PASSWORD_MODAL_OPEN';
//? Constants for handling reseting password endpoint
export const RESET_PASSWORD_IN_PROGRESS = 'RESET_PASSWORD_IN_PROGRESS';
export const RESET_PASSWORD_COMPLETED = 'RESET_PASSWORD_COMPLETED';
//? Constants for handling general authentication state
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
export const LOGOUT_USER = 'LOGOUT_USER';
//?  Constants for error handling
export const AUTH_401_ERROR = 'AUTH_401_ERROR';
export const AUTH_404_ERROR = 'AUTH_404_ERROR';
export const AUTH_500_ERROR = 'AUTH_500_ERROR';
export const REMOVE_AUTH_ERRORS = 'REMOVE_AUTH_ERRORS';