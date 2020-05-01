import {
    FETCHING_HOTELS_IN_PROGRESS,
    FETCHING_HOTELS_COMPLETED,
    STORE_FETCHED_HOTELS,
    FETCHING_HOTEL_IN_PROGRESS,
    FETCHING_HOTEL_COMPLETED,
    STORE_FETCHED_HOTEL,
    REMOVE_HOTEL,
    SET_HOTEL_FILTERS,
    CLEAR_HOTEL_REDUCER,
    SET_HOTEL_PAGE,
    SET_HOTEL_TYPE,
    STORE_ADDITIONAL_HOTELS,
    STORE_FETCHED_FAVORITE_HOTELS,
    FETCHING_REVIEWS_IN_PROGRESS,
    FETCHING_REVIEWS_COMPLETED,
    SET_HOTEL_TO_FAVORITE_IN_PROGRESS,
    SET_HOTEL_TO_FAVORITE_COMPLETED,
    SET_EDITING_HOTEL_IN_PROGRESS,
    SET_EDITING_HOTEL_COMPLETED
} from '../constants';

//? Actions for fetching multiple hotels
export const ACTION_FETCHING_HOTELS_IN_PROGRESS = () => { return { type: FETCHING_HOTELS_IN_PROGRESS } };
export const ACTION_FETCHING_HOTELS_COMPLETED = () => { return { type: FETCHING_HOTELS_COMPLETED } };
export const ACTION_STORE_FETCHED_HOTELS = (hotels) => { return { type: STORE_FETCHED_HOTELS, payload: hotels } };
export const ACTION_STORE_FETCHED_FAVORITE_HOTELS = (hotels) => { return { type: STORE_FETCHED_FAVORITE_HOTELS, payload: hotels } }
export const ACTION_STORE_ADDITIONAL_HOTELS = (hotels) => { return { type: STORE_ADDITIONAL_HOTELS, payload: hotels } }
//? Actions for handling a single hotel
export const ACTION_FETCHING_HOTEL_IN_PROGRESS = () => { return { type: FETCHING_HOTEL_IN_PROGRESS } };
export const ACTION_FETCHING_HOTEL_COMPLETED = () => { return { type: FETCHING_HOTEL_COMPLETED } };
export const ACTION_STORE_FETCHED_HOTEL = (hotel) => { return { type: STORE_FETCHED_HOTEL, payload: hotel } };
export const ACTION_REMOVE_HOTEL = () => { return { type: REMOVE_HOTEL } };
//? Actions for handling general state of hotel reducer
export const ACTION_SET_HOTEL_FILTERS = (filters) => { return { type: SET_HOTEL_FILTERS, payload: filters } };
export const ACTION_CLEAR_HOTEL_REDUCER = () => { return { type: CLEAR_HOTEL_REDUCER } };
export const ACTION_SET_HOTEL_PAGE = (page) => { return { type: SET_HOTEL_PAGE, payload: page } };
export const ACTION_SET_HOTEL_TYPE = (type) => { return { type: SET_HOTEL_TYPE, payload: type } };
//? Review fething actions
export const ACTION_FETCHING_REVIEWS_IN_PROGRESS = () => { return { type: FETCHING_REVIEWS_IN_PROGRESS } };
export const ACTION_FETCHING_REVIEWS_COMPLETED = () => { return { type: FETCHING_REVIEWS_COMPLETED } };
//? Favorite setting actions
export const ACTION_SET_HOTEL_TO_FAVORITE_IN_PROGRESS = () => { return { type: SET_HOTEL_TO_FAVORITE_IN_PROGRESS } };
export const ACTION_SET_HOTEL_TO_FAVORITE_COMPLETED = () => { return { type: SET_HOTEL_TO_FAVORITE_COMPLETED } };

export const ACTION_SET_EDITING_HOTEL_IN_PROGRESS = () => { return { type: SET_EDITING_HOTEL_IN_PROGRESS } };
export const ACTION_SET_EDITING_HOTEL_COMPLETED = () => { return { type: SET_EDITING_HOTEL_COMPLETED } };