import { get, post, patch, deleteReq } from "./api.services";


export const getUserProfileService = () => {
    return get('/user');
};

export const updateUserProfileService = (body) => {
    return patch('/user', body);
};

export const addAddressService = (body) => {
    return post('/user/address', body);
};

export const addToWishListService = (body) => {
    return post('/user/wishlist', body);
};

export const removeFromWishListService = (productId) => {
    return deleteReq(`/user/wishlist/${productId}`);
};

export const getWishListService = (body) => {
    return get('/user/wishlist', body);
};

export const addToCartService = (body) => {
    return post('/user/cart', body);
};

export const updateCartService = (body) => {
    return patch('/user/cart', body);
};

export const removeCartService = (productId) => {
    return deleteReq(`/user/cart/${productId}`);
};

export const getCartListService = (body) => {
    return get('/user/cart');
};

export const getOrderListService = (body) => {
    return get('/user/orders');
};

export const getOrderService = (orderId) => {
    return get(`/user/order/${orderId}`);
};

export const getWishList = (orderId) => {
    return get(`/user/order/${orderId}`);
};
