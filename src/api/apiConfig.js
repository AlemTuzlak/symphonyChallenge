import axios from 'axios';
import { getAccessToken } from '../helpers/localStorageHandlers';

const apiInstance = axios.create({
    baseURL: `http://localhost:8000/`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAccessToken()}`,
        'Accept': 'application/json'
    }
});

// Add a response interceptor
apiInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let passError = {};

    if(!error.response){
        passError = new Error();
        passError.status = 500;
        passError.data = null;
        passError.message = 'No Server error response';
    } else {
        passError = error.response
    }

    return Promise.reject(passError);
  });

export default apiInstance;