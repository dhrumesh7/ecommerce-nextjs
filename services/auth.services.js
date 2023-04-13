import { get, post } from "./api.services";


export const emailSingUp = (body) => {
    return post('/auth/signup', body);
};

export const emailLogin = (body) => {
    return post('/auth/login', body);
};

export const logOutService = (body) => {
    return get('/auth/logout', body);
};
