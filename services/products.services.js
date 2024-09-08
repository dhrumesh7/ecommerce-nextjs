import { get } from "./api.services";

// Service to fetch all products, accepting a query object (e.g., filters, pagination, etc.)
export const getAllProductsService = (query) => {
    return get('/products/all', {
        params: query
    });
};

// Service to fetch products on sale
export const getSaleProductsService = (query) => {
    return get('/products/sale', {
        params: query
    });
};

// Service to fetch newly arrived products
export const getNewProductsService = (query) => {
    return get('/products/new', {
        params: query
    });
};

// Service to fetch products by category
export const getCategoryProductsService = (query) => {
    return get('/products/category', {
        params: query
    });
};

// Service to fetch products by subcategory
export const getSubCategoryProductsService = (query) => {
    return get('/products/subcategory', {
        params: query
    });
};

// Service to fetch the list of filters (e.g., categories, brands, prices, etc.)
export const getFilterListService = (query) => {
    return get('/products/filter-list', {
        params: query
    });
};

// Service to fetch products displayed on the homepage
export const getHomeProductsService = () => {
    return get('/products/home');
};

// Service to fetch similar products to a specific product
export const getSimiliarProductsService = (query) => {
    return get('/products/similar', {
        params: query
    });
};

// Service to search products based on a search query
export const searchProductsService = (query) => {
    return get('/products/search', {
        params: query
    });
};