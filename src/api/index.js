

import apiInstance from './apiConfig';


//* -------------------------------------------------------------- //
//*                    AUTHENTICATION ENDPOINTS                    //
//* -------------------------------------------------------------- //
function login(email, username, password) {
    const data = new FormData();
    data.append('email', email);
    data.append('username', username);
    data.append('password', password);

    return apiInstance.post('/api-token-auth/', data);
}

function register(email, username, password, first_name, last_name) {
    const data = new FormData();
    data.append('email', email);
    data.append('username', username);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('password', password);

    return apiInstance.post('/register/', data);
}


//* -------------------------------------------------------------- //
//*                          HOTEL ENDPOINTS                       //
//* -------------------------------------------------------------- //

function getHotels(page) {
    return apiInstance.get(`/hotel_api/?page=${page}`)
}

function getFavoriteHotels() {
    return apiInstance.get(`/favorites/`)
}

function getHotel(id) {
    return apiInstance.get(`/hotel_api/${id}`)
}

function getHotelReviews(id) {
    return apiInstance.get(`/hotel_api/get_hotel_reviews/${id}`)
}

function addOrRemoveFavoriteHotel(hotel_id, is_favorite) {
    const data = new FormData();
    data.append('hotel_id', hotel_id);
    data.append('is_favorite', is_favorite);

    return apiInstance.post('/favorites/add_remove', data);
}

function editHotel(stars, country, city, name, description, location, price, user) {
    const data = new FormData();
    data.append('stars', stars);
    data.append('country', country);
    data.append('city', city);
    data.append('name', name);
    data.append('description', description);
    data.append('location', location);
    data.append('price', price);
    data.append('user', user);

    return apiInstance.post(`/hotel_api/`, data)
}

const api = {
    login,
    register,
    getHotels,
    getHotel,
    getFavoriteHotels,
    getHotelReviews, 
    addOrRemoveFavoriteHotel,
    editHotel
}

export default api;