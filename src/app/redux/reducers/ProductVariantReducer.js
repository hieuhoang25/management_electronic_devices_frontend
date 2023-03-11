import { LIST_PRODUCT_VARIANT } from '../actions/ProductVariantAction';

const initalState = {
    data: [],
    product_id: '',
};

const ProductVariantReducer = (state = initalState, action) => {
    switch (action.type) {
        case LIST_PRODUCT_VARIANT:
            return {
                ...state,
                stateTable: 'productVariant',
                data: action.payload.data.data,
                totalPage: action.payload.totalPage,
                product_id: action.payload.id,
            };
        default:
            return {
                ...state,
            };
    }
};
export default ProductVariantReducer;
