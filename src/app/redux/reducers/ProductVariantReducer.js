import {
    LIST_PRODUCT_VARIANT,
    GET_PRODUCTV_FROM_STORE,
    CLEAR_PRODUCT_VARIANT,
    SET_PAGE_NUMBER,
    CLEAR_STATE,
} from '../actions/ProductVariantAction';

const initalState = {
    data: [],
    product_id: '',
    productVariantById: {},
    totalPage: 0,
    pageNumber: 1,
};

const ProductVariantReducer = (state = initalState, action) => {
    switch (action.type) {
        case LIST_PRODUCT_VARIANT:
            return {
                ...state,
                stateTable: 'productVariant',
                data: action.payload.data.data,
                totalPage: action.payload.data.totalPage,
                product_id: action.payload.id,
            };
        case GET_PRODUCTV_FROM_STORE:
            var productVFilterId = state.data.filter((obj) => {
                return obj.id === action.payload;
            });
            return {
                ...state,
                productVariantById: productVFilterId[0],
            };
        case CLEAR_PRODUCT_VARIANT:
            return {
                data: [],
                product_id: '',
                productVariantById: {},
            };
        case SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.payload,
            };
        case CLEAR_STATE:
            return {
                data: [],
                product_id: '',
                productVariantById: {},
                totalPage: '',
                pageNumber: 1,
            };
        default:
            return {
                ...state,
            };
    }
};
export default ProductVariantReducer;
