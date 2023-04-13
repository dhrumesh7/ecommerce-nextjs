import { get } from "./api.services";


export const getAllCategoryService = (body) => {
    return get('/category/all', {
        // params: {
        //     token: localStorage.getItem('token'),
        //     platform: 'web',
        // },
    });
};

export const getAllProductsService = (query) => {
    return get('/products/all', {
        params: {
            page: query
        },
    });
};
