import { PRODUCT_FORM, STATUS_DISABLE } from '../actions/ProductAction';

const initalState = {
    productList: [],
    formProduct: {
        name: '',
        category: '',
        subcategory: '',
    },
    inputNextStatus: true,
};
const ProductReducre = (state = initalState, action) => {
    switch (action.type) {
        case PRODUCT_FORM:
            return {
                ...state,
                formProduct: action.payload,
            };
        case STATUS_DISABLE: {
            return {
                ...state,
                inputNextStatus: action.payload,
            };
        }
        default:
            return state;
    }
};
export default ProductReducre;
