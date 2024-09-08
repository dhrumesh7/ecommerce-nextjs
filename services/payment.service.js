import { post } from "./api.services";

// Function to handle create order
export const createOrderService = (body) => {
    return post('/payment/orders', body);
};

// Function to handle payment success
export const paymentSuccessService = (body) => {
    return post('/payment/success', body);
};

// Function to handle payment failure
export const paymentFailureService = (body) => {
    return post('/payment/failure', body);
};

// Function to handle COD order
export const CODOrderService = (body) => {
    return post('/payment/cod', body);
};