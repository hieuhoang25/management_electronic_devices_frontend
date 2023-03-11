import {
    GET_BRAND_PRODUCT,
    HANDLE_CHANGE_BRAND,
    GET_ALL_BRAND,
} from '../actions/BrandAction';

const inialState = {
    data: [],

    brandOfProduct: {},
    brandFilterOfProduct: [],
};

const BrandReducer = (state = inialState, action) => {
    switch (action.type) {
        case GET_ALL_BRAND:
            var brandFilter = [];
            action.payload.map((items) => {
                let item = { brand_name: items.brand_name, brand_id: items.id };
                return brandFilter.push(item);
            });
            return {
                ...state,
                data: brandFilter,
            };
        case GET_BRAND_PRODUCT:
            var newBrandOfProduct = action.payload.data.filter((obj) => {
                return obj.id === action.payload.productId;
            });
            var newBrandFilterOfProduct = [];
            action.payload.data.map((items) => {
                let item = { brand_name: items.brand_name, brand_id: items.id };
                return newBrandFilterOfProduct.push(item);
            });
            return {
                ...state,
                data: action.payload,
                brandOfProduct: {
                    brand_name: newBrandOfProduct[0].brand_name,
                    brand_id: newBrandOfProduct[0].id,
                },
                brandFilterOfProduct: newBrandFilterOfProduct,
            };
        case HANDLE_CHANGE_BRAND:
            return {
                ...state,
                brandOfProduct: action.payload,
            };
        default:
            return { ...state };
    }
};
export default BrandReducer;
