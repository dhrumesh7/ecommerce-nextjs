import { get } from "./api.services";

// Function to handle get all categories
export const getAllCategoryService = (body) => {
    return get('/category/all', {
    });
};

// Function to handle get all products
export const getAllProductsService = (query) => {
    return get('/products/all', {
        params: {
            page: query
        },
    });
};
