import { get, post } from "./api.services";

export const cancelShipmentService = (body) => {
    return post('/shipment/cancel', body);
};

export const getShipmentService = (orderId) => {
    return get(`/shipment/tracking/${orderId}`);
};
