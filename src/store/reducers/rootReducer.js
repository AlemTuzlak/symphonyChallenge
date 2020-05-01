import authReducer from './authReducer';
import hotelReducer from './hotelReducer';

import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['token', 'isLoggedIn', 'user', 'userId']
}

const hotelPersistConfig = {
    key: 'hotels',
    storage: storage,
    whitelist: ['hotels', 'favoriteHotels', 'hotel']
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    hotels: persistReducer(hotelPersistConfig, hotelReducer)
})


export default rootReducer;