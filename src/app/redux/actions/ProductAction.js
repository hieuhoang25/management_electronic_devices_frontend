import PropTypes from 'prop-types';
import axios from 'axios';
export const LIST_PRODUCTS = 'listProducts';
export const STATUS_DISABLE = 'statusDisable';
export const LIST_PRODUCT_VARIANT = 'listProductVariant';
export const CHANGE_STATE_TABLE = 'changeStateTable';
export const LIST_PRODUCT_ATTRIBUTE = 'listProductAttribute';

export const getProductsList = (size, page) => (dispatch) => {
    axios
        .get(
            process.env.REACT_APP_BASE_URL +
                'product?size=' +
                size +
                '&page=' +
                page,
        )
        .then((res) => {
            dispatch({
                type: LIST_PRODUCTS,
                payload: res.data.data,
            });
        });
};
export const getProductAttributeList = (id) => (dispatch) => {
    axios
        .get(process.env.REACT_APP_BASE_URL + 'product_attribute/' + id)
        .then((res) => {
            dispatch({
                type: LIST_PRODUCT_ATTRIBUTE,
                payload: res.data,
            });
        });
};
export const StatusDisable = (bool) => {
    return {
        type: STATUS_DISABLE,
        payload: bool,
    };
};
export const getProductVariant = (size, page, id) => (dispatch) => {
    axios
        .get(
            process.env.REACT_APP_BASE_URL +
                'product_variant/' +
                id +
                '?size=' +
                size +
                '&page=' +
                page,
        )
        .then((res) => {
            dispatch({
                type: LIST_PRODUCT_VARIANT,
                payload: res.data,
            });
        });
};
export const changeStateTable = (state) => {
    return {
        type: CHANGE_STATE_TABLE,
        payload: state,
    };
};
getProductsList.propTypes = {
    size: PropTypes.number,
    page: PropTypes.number,
};
