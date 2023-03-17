import {
    LIST_PRODUCTS,
    STATUS_DISABLE,
    CHANGE_STATE_TABLE,
    GET_PRODUCT_BYID,
    DELETE_PRODUCT,
    PUT_PRODUCT,
    POST_PRODUCT,
    SET_PAGE_PRODUCT,
} from '../actions/ProductAction';

const initalState = {
    listProduct: [],
    inputNextStatus: true,
    breadCrum: {
        data: [
            { name: 'Quản lý sản phẩm', path: '/product' },
            { name: 'Quản lý sản phẩm', path: '/product' },
        ],
    },
    productId: '',
    stateTable: 'product',
    totalPage: 0,
    pageNumber: 1,
    productById: {},
};
const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case LIST_PRODUCTS:
            return {
                ...state,
                listProduct: action.payload,
                totalPage: action.payload.totalPage,
            };
        case STATUS_DISABLE:
            return {
                ...state,
                data: action.payload,
            };

        case CHANGE_STATE_TABLE:
            return {
                ...state,
                stateTable: action.payload,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
            };

        case GET_PRODUCT_BYID:
            return {
                ...state,
                productById: action.payload,
            };

        case PUT_PRODUCT: {
            // console.log(action.payload);
            return {
                ...state,
                productById: action.payload,
            };
        }
        case POST_PRODUCT:
            return {
                ...state,
                productById: action.payload,
            };
        case SET_PAGE_PRODUCT:
            return {
                ...state,
                pageNumber: action.payload,
            };
        default:
            return state;
    }
};
export default ProductReducer;
