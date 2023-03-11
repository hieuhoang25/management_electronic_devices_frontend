import axios from 'axios.js';
export const LIST_PRODUCT_VARIANT = 'listProductVariant';
export const DELETE_PRODUCT_VARIANT = 'deleteProductVariant';

export const getProductVariant = (size, page, id) => async (dispatch) => {
    await axios
        .get(
            process.env.REACT_APP_BASE_URL +
                'product-variant/' +
                id +
                '?size=' +
                size +
                '&page=' +
                page,
        )
        .then((res) => {
            dispatch({
                type: LIST_PRODUCT_VARIANT,
                payload: { data: res.data, id: id },
            });
        });
};
export const deleteProductVariant = (id, isDelted) => async (dispatch) => {
    await axios
        .delete(
            process.env.REACT_APP_BASE_URL +
                'product-variant/' +
                id +
                '/' +
                isDelted,
        )
        .then(() => {
            dispatch({
                type: DELETE_PRODUCT_VARIANT,
            });
        });
};
