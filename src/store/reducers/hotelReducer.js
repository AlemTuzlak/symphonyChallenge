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
    STORE_ADDITIONAL_HOTELS,
    STORE_FETCHED_FAVORITE_HOTELS,
    FETCHING_REVIEWS_IN_PROGRESS,
    FETCHING_REVIEWS_COMPLETED,
    SET_HOTEL_TO_FAVORITE_IN_PROGRESS,
    SET_HOTEL_TO_FAVORITE_COMPLETED,
    SET_EDITING_HOTEL_IN_PROGRESS,
    SET_EDITING_HOTEL_COMPLETED
} from '../constants';

const initState = {
    hotels: [],
    fetchingHotels: false,
    fetchingHotel: false,
    fetchingHotelReviews: false,
    settingHotelToFavorite: false,
    editingHotel: false,
    favoriteHotels: [],
    hotel: {},
    page: 1, 
}

const hotelReducer = (state = initState, action) => {

    switch (action.type) {

        case FETCHING_HOTELS_IN_PROGRESS: {
            return {
                ...state,
                fetchingHotels: true
            }
        }

        case FETCHING_HOTELS_COMPLETED: {
            return {
                ...state,
                fetchingHotels: false
            }
        } 

        case STORE_FETCHED_HOTELS: {
            return {
                ...state,
                hotels: action.payload
            }
        }

        case STORE_FETCHED_FAVORITE_HOTELS: {
            return {
                ...state,
                favoriteHotels: action.payload
            }
        }

        case STORE_ADDITIONAL_HOTELS: {
            return {
                ...state,
                hotels: [...state.hotels, ...action.payload]
            }
        }

        case FETCHING_HOTEL_IN_PROGRESS: {
            return {
                ...state,
                fetchingHotel: true
            }
        }
        case FETCHING_HOTEL_COMPLETED: {
            return {
                ...state,
                fetchingHotel: false
            }
        }
        case STORE_FETCHED_HOTEL: {
            return {
                ...state,
                hotel: action.payload
            }
        }
        case SET_HOTEL_FILTERS: {
            return {
                ...state,
                filters: action.payload
            }
        }

        case REMOVE_HOTEL: {
            return { 
                ...state,
                hotel: {}
            }
        }

        case CLEAR_HOTEL_REDUCER: {
            return {
                ...initState
            }
        }

        case SET_HOTEL_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }

        case FETCHING_REVIEWS_IN_PROGRESS: {
            return {
                ...state,
                fetchingHotelReviews: true
            }
        }

        case FETCHING_REVIEWS_COMPLETED: {
            return {
                ...state,
                fetchingHotelReviews: false
            }
        }
        case SET_HOTEL_TO_FAVORITE_IN_PROGRESS: {
            return {
                ...state,
                settingHotelToFavorite: true
            }
        }
        case SET_HOTEL_TO_FAVORITE_COMPLETED: {
            return {
                ...state,
                settingHotelToFavorite: false
            }
        }
        case SET_EDITING_HOTEL_IN_PROGRESS: {
            return {
                ...state,
                editingHotel: true
            }
        }
        case SET_EDITING_HOTEL_COMPLETED: {
            return {
                ...state,
                editingHotel: false
            }
        }
        default: {
            return state;
        }
    }
}

export default hotelReducer;