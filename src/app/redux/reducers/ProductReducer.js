import {
    LIST_PRODUCTS,
    STATUS_DISABLE,
    CHANGE_STATE_TABLE,
    GET_PRODUCT_BYID,
    DELETE_PRODUCT,
    PUT_PRODUCT,
    POST_PRODUCT,
    SET_STATE_DELETED,
    SET_PAGE_PRODUCT,
    HANDLE_CHANGE_KEYSEARCH,
    GET_PRODUCTS_FILTERS,
    HANDLE_RESET_PRODUCT,
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

    stateDeleted: {
        label: 'Hiển thị tất cả',
        deleted: -1,
    },
    keysearch: '',
};
const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case LIST_PRODUCTS:
            return {
                ...state,
                listProduct: action.payload,
                totalPage: action.payload.totalPage,
            };
        case GET_PRODUCTS_FILTERS:
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
        case SET_STATE_DELETED:
            return {
                ...state,
                stateDeleted: action.payload,
            };
        case HANDLE_CHANGE_KEYSEARCH:
            return {
                ...state,
                keysearch: action.payload,
            };
        case HANDLE_RESET_PRODUCT:
            console.log('reset product');
            return {
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

                stateDeleted: {
                    label: 'Hiển thị tất cả',
                    deleted: -1,
                },
                keysearch: '',
            };
        default:
            return state;
    }
};
export default ProductReducer;
