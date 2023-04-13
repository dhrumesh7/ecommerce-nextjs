import { get } from "./api.services";

export const getAllProductsService = (query) => {
    return get('/products/all', {
        params: query
    });
};

export const getCategoryProductsService = (query) => {
    return get('/products/category', {
        params: query
    });
};


export const getSubCategoryProductsService = (query) => {
    return get('/products/subcategory', {
        params: query
    });
};

export const getFilterListService = (query) => {
    return get('/products/filter-list', {
        params: query
    });
};

export const getHomeProductsService = () => {
    return get('/products/home');
};

export const getSimiliarProductsService = (query) => {
    return get('/products/similar', {
        params: query
    });
};

export const searchProductsService = (query) => {
    return get('/products/search', {
        params: query
    });
};