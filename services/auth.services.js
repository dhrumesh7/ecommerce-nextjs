import { get, post } from "./api.services";


// Function to handle email sign-up
export const emailSingUp = (body) => {
    return post('/auth/signup', body);
};

// Function to handle email login
export const emailLogin = (body) => {
    return post('/auth/login', body);
};

// Function to handle logout
export const logOutService = (body) => {
    return get('/auth/logout', body);
};
