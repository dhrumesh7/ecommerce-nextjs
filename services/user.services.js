import { get, post, patch, deleteReq } from "./api.services";

// Service to fetch the user's profile
export const getUserProfileService = () => {
    return get('/user');
};

// Service to update the user's profile
export const updateUserProfileService = (body) => {
    return patch('/user', body);
};

// Service to add a new address for the user
export const addAddressService = (body) => {
    return post('/user/address', body);
};

// Service to add a product to the user's wishlist
export const addToWishListService = (body) => {
    return post('/user/wishlist', body);
};

// Service to remove a product from the user's wishlist
export const removeFromWishListService = (productId) => {
    return deleteReq(`/user/wishlist/${productId}`);
};

// Service to get the user's wishlist
export const getWishListService = (body) => {
    return get('/user/wishlist', body);
};

// Service to add a product to the user's cart
export const addToCartService = (body) => {
    return post('/user/cart', body);
};

// Service to update the user's cart
export const updateCartService = (body) => {
    return patch('/user/cart', body);
};

// Service to remove a product from the user's cart
export const removeCartService = (productId, sku) => {
    return deleteReq(`/user/cart/${productId}/${sku}`);
};

// Service to get the list of products in the user's cart
export const getCartListService = (body) => {
    return get('/user/cart');
};

// Service to get the list of user's orders
export const getOrderListService = (body) => {
    return get('/user/orders');
};

// Service to get the details of a specific order by order ID
export const getOrderService = (orderId) => {
    return get(`/user/order/${orderId}`);
};

export const getWishList = (orderId) => {
    return get(`/user/order/${orderId}`);
};

// Service to check available rewards for the user
export const checkRewardService = (body) => {
    return post(`/reward/check/`, body);
};