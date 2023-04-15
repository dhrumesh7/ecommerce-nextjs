import { post } from "./api.services";

export const cancelShipmentService = (body) => {
    return post('/shipment/cancel', body);
};