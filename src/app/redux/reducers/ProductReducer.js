import {
    LIST_PRODUCTS,
    LIST_PRODUCT_VARIANT,
    STATUS_DISABLE,
    CHANGE_STATE_TABLE,
    LIST_PRODUCT_ATTRIBUTE,
} from '../actions/ProductAction';

const initalState = {
    listProduct: [],
    listProductVariant: [],
    listProductAttribute: [],
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
};
const ProductReducer = (state = initalState, action) => {
    switch (action.type) {
        case LIST_PRODUCTS:
            return {
                ...state,
                listProduct: action.payload,
                totalPage: action.payload.totalPage,
            };
        case STATUS_DISABLE: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case LIST_PRODUCT_VARIANT: {
            return {
                ...state,
                stateTable: 'productVariant',
                listProductVariant: action.payload,
                productId:
                    action.payload.data.length === 0
                        ? ''
                        : action.payload.data[0].product_id,
                totalPage: action.payload.totalPage,
            };
        }
        case CHANGE_STATE_TABLE: {
            return {
                ...state,
                stateTable: action.payload,
            };
        }
        case LIST_PRODUCT_ATTRIBUTE: {
            return {
                ...state,
                listProductAttribute: action.payload,
            };
        }
        default:
            return state;
    }
};
export default ProductReducer;
