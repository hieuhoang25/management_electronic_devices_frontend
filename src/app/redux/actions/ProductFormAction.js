export const PRODUCT_FORM = 'productForm';
export const STATUS_DISABLE = 'statusDisable';

export const ProductForm = (value) => {
    return {
        type: PRODUCT_FORM,
        payload: value,
    };
};
export const StatusDisable = (bool) => {
    return {
        type: STATUS_DISABLE,
        payload: bool,
    };
};
