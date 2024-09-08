import axios from 'axios';

import { trackPromise } from 'react-promise-tracker';
import { logOut } from '../components/Account/SideBar';


const api = axios.create({
    baseURL: '/backend',
});

// API request interceptors
api.interceptors.request.use(
    (config) => {
        const options = { ...config };

        options.headers['Content-Type'] = 'application/json';
        options.withCredentials = true;

        return options;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API response interceptors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (
            error.response &&
            [401].indexOf(error.response.status) !== -1
        ) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.clear();
            if (typeof window === 'undefined') {
                throw new CustomError(); //Throw custom error here
            } else {
                console.log('yoooooooo')
                window.location.href = '/login';
                logOut()
            }
        }
        return Promise.reject(error);
    }
);

// GET request function
export const get = (url, param) => trackPromise(api.get(url, param));

// POST request function
export const post = (url, param) => trackPromise(api.post(url, param));

// PATCH request function
export const patch = (url, param) => trackPromise(api.patch(url, param));

// DELETE request function
export const deleteReq = (url, param) => trackPromise(api.delete(url, param));



