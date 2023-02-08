import { PRODUCT_FORM, STATUS_DISABLE } from '../actions/ProductFormAction';

const initalState = {
    formProduct: {
        name: '',
        category: '',
        subCategory: '',
    },
    inputNextStatus: true,
    stepperNumber: '0',
};
const ProductFormReducer = (state = initalState, action) => {
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
export default ProductFormReducer;
