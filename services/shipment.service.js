import { get, post } from "./api.services";

// Function to handle cancle shipment
export const cancelShipmentService = (body) => {
    return post('/shipment/cancel', body);
};

// Function to handle get shipment
export const getShipmentService = (orderId) => {
    return get(`/shipment/tracking/${orderId}`);
};

// Function to handle get invoice
export const invoiceService = (shipRocketOrderId) => {
    return get(`/shipment/invoice/${shipRocketOrderId}`);
};
