import api from '../../api';

import {  
    ACTION_FETCHING_HOTELS_IN_PROGRESS,
    ACTION_FETCHING_HOTELS_COMPLETED,
    ACTION_STORE_FETCHED_HOTELS,
    ACTION_FETCHING_HOTEL_IN_PROGRESS,
    ACTION_FETCHING_HOTEL_COMPLETED,
    ACTION_STORE_FETCHED_HOTEL,
    ACTION_REMOVE_HOTEL,
    ACTION_SET_HOTEL_PAGE,
    ACTION_STORE_ADDITIONAL_HOTELS,
    ACTION_STORE_FETCHED_FAVORITE_HOTELS,
    ACTION_FETCHING_REVIEWS_IN_PROGRESS,
    ACTION_FETCHING_REVIEWS_COMPLETED,
    ACTION_SET_HOTEL_TO_FAVORITE_IN_PROGRESS,
    ACTION_SET_HOTEL_TO_FAVORITE_COMPLETED,
    ACTION_SET_EDITING_HOTEL_IN_PROGRESS,
    ACTION_SET_EDITING_HOTEL_COMPLETED
} from './hotelActionsList';

import { toast } from 'react-toastify';

//? Fetches all the hotels //
export const getHotels = () => {
    return async (dispatch) => {
        try {
            dispatch(ACTION_SET_HOTEL_PAGE(1));
            dispatch(ACTION_FETCHING_HOTELS_IN_PROGRESS());
            
            const response = await api.getHotels(1);
            if(response && response.data){
                //! NOT SURE WHAT I GET AS RESPONSE, DEPENDING ON THAT THIS ENDPOINT WOULD WORK
                dispatch(ACTION_STORE_FETCHED_HOTELS(response.data.hotels));
            }
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to fetch hotels!')
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        }   
    }
}

//? Fetches all the favorite hotels //
export const getFavoriteHotels = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_FETCHING_HOTELS_IN_PROGRESS());
            
            const response = await api.getFavoriteHotels();
            if(response && response.data){
                //! NOT SURE WHAT I GET AS RESPONSE, DEPENDING ON THAT THIS ENDPOINT WOULD WORK
                dispatch(ACTION_STORE_FETCHED_FAVORITE_HOTELS(response.data.hotels));
            }
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to fetch favorite hotels!')
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        }   
    }
}

export const getMoreHotels = () => {
    return async (dispatch, getState) => {
        try {
            const page = getState().hotels.page;

            dispatch(ACTION_FETCHING_HOTELS_IN_PROGRESS());
            const response = await api.getHotels(page);
            if(response && response.data){
                //! NOT SURE WHAT I GET AS RESPONSE, DEPENDING ON THAT THIS ENDPOINT WOULD WORK
                dispatch(ACTION_STORE_ADDITIONAL_HOTELS(response.data.hotels));
            }
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to fetch more hotels!')
            dispatch(ACTION_FETCHING_HOTELS_COMPLETED());
        }   
    }
}

//? Fetches a single Hotel Details //
export const getHotel = (id) => {
    return async (dispatch) => {
        try {
            dispatch(ACTION_FETCHING_HOTEL_IN_PROGRESS());
            const response = await api.getHotel(id);
            if(response && response.data){
                //! NOT SURE WHAT I GET AS RESPONSE, DEPENDING ON THAT THIS ENDPOINT WOULD WORK
                dispatch(ACTION_STORE_FETCHED_HOTEL(response.data.hotel));
            }
            dispatch(ACTION_FETCHING_HOTEL_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to fetch hotel details!')
            dispatch(ACTION_FETCHING_HOTEL_COMPLETED());
        }   
    }
}
//? Fetches a single Hotel reviews //
export const getHotelReviews = (id, forFavorites) => {
    return async (dispatch, getState) => {
        try {
            dispatch(ACTION_FETCHING_REVIEWS_IN_PROGRESS());
            const response = await api.getHotelReviews(id);
            if(response && response.data){
                const hotels = getState().hotels.hotels;
                
                const newHotels = hotels.map(hotel => {
                    if(hotel.id === id){
                        return {...hotel, reviews: response.data.reviews};
                    }
                    return hotel;
                });
                //! NOT SURE WHAT I GET AS RESPONSE, DEPENDING ON THAT THIS ENDPOINT WOULD WORK
                if(!forFavorites)
                    dispatch(ACTION_STORE_FETCHED_HOTELS(newHotels));
                else
                    dispatch(ACTION_STORE_FETCHED_FAVORITE_HOTELS(newHotels));
            }
            dispatch(ACTION_FETCHING_REVIEWS_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to fetch hotel reviews!')
            dispatch(ACTION_FETCHING_REVIEWS_COMPLETED());
        }   
    }
}


//? Removes the single hotel in state //
export const removeHotel = () => {
    return (dispatch) => {
        dispatch(ACTION_REMOVE_HOTEL());
    }
}

export const setHotelPage = (page) => {
    return (dispatch) => {
        dispatch(ACTION_SET_HOTEL_PAGE(page));
    }
}

export const addOrRemoveHotelFromFavorites = (id, is_favorite) => {
    return async (dispatch) => {
        try {
            dispatch(ACTION_SET_HOTEL_TO_FAVORITE_IN_PROGRESS());
            
            await api.addOrRemoveFavoriteHotel(id, is_favorite);
            
            dispatch(ACTION_SET_HOTEL_TO_FAVORITE_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to add/remove hotel to/from favorites!')
            dispatch(ACTION_SET_HOTEL_TO_FAVORITE_COMPLETED());
        }   
    }
}

export const editHotel = (stars, country, city, name, description, location, price, user) => {
    return async (dispatch) => {
        try {
            dispatch(ACTION_SET_EDITING_HOTEL_IN_PROGRESS());
            
            await api.editHotel(stars, country, city, name, description, location, price, user);
            toast.success('Hotel successfully edited!');
            dispatch(ACTION_SET_EDITING_HOTEL_COMPLETED());
        } catch (error) {
            toast.error('Something went wrong while trying to edit a hotel!')
            dispatch(ACTION_SET_EDITING_HOTEL_COMPLETED());
        }   
    }
}