import { post } from "./api.services";

export const createOrderService = (body) => {
    return post('/payment/orders', body);
};

export const paymentSuccessService = (body) => {
    return post('/payment/success', body);
};

export const paymentFailureService = (body) => {
    return post('/payment/failure', body);
};