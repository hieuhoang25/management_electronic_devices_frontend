import PropTypes from 'prop-types';
import axios from 'axios.js';
export const LIST_PRODUCTS = 'listProducts';
export const STATUS_DISABLE = 'statusDisable';
export const CHANGE_STATE_TABLE = 'changeStateTable';
export const DELETE_PRODUCT = 'deleteProduct';
export const GET_PRODUCT_BYID = 'getProductById';
export const PUT_PRODUCT = 'putProduct';
export const POST_PRODUCT = 'postProduct';
export const SET_PAGE_PRODUCT = 'setPageProduct';
export const SET_STATE_DELETED = 'setStateDeleted';
export const HANDLE_CHANGE_KEYSEARCH = 'handleChangeKeysearch';
export const GET_PRODUCTS_FILTERS = 'getProductsFilters';
export const HANDLE_RESET_PRODUCT = 'handleResetProduct';

export const getProductsList = (size, page) => async (dispatch, getState) => {
    if (
        getState().products.stateDeleted.deleted !== -1 ||
        getState().products.keysearch !== ''
    ) {
        await dispatch(
            getProductsFilters(
                5,
                page,
                getState().products.keysearch,
                getState().products.stateDeleted.deleted,
            ),
        );

        return;
    }
    await axios
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
export const getProductsFilters =
    (size, page, search, isDeleted) => async (dispatch) => {
        const rs = await axios.get(
            process.env.REACT_APP_BASE_URL +
                'product/search?size=' +
                size +
                '&page=' +
                page +
                '&search=' +
                search +
                '&isDelete=' +
                isDeleted,
        );
        // .then((res) => {
        //     console.log(res);
        //     dispatch({
        //         type: GET_PRODUCTS_FILTERS,
        //         payload: res.data.data,
        //     });
        // });
        await dispatch({
            type: GET_PRODUCTS_FILTERS,
            payload: rs.data.data,
        });
    };
export const getProductById = (id) => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'product/' + id).then((res) =>
        dispatch({
            type: GET_PRODUCT_BYID,
            payload: res.data,
        }),
    );
};
export const deleteProduct = (id, isDelted) => (dispatch) => {
    axios
        .delete(
            process.env.REACT_APP_BASE_URL + 'product/' + id + '/' + isDelted,
        )
        .then(() => {
            dispatch({
                type: DELETE_PRODUCT,
            });
        });
};
export const putProduct = (product) => (dispatch) => {
    axios
        .put(
            process.env.REACT_APP_BASE_URL + 'product/',

            product,
        )
        .then((res) => {
            dispatch({
                type: PUT_PRODUCT,
                payload: res.data,
            });
        });
};
export const postProduct = (product) => (dispatch) => {
    axios
        .post(
            process.env.REACT_APP_BASE_URL + 'product',

            product,
        )
        .then((res) => {
            dispatch({
                type: POST_PRODUCT,
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
export const changeStateTable = (state) => {
    return {
        type: CHANGE_STATE_TABLE,
        payload: state,
    };
};
export const setStateDeleted = (state) => {
    return {
        type: SET_STATE_DELETED,
        payload: state,
    };
};
export const setPageProduct = (pageNumber) => {
    return {
        type: SET_PAGE_PRODUCT,
        payload: pageNumber,
    };
};
export const handleChangeKeysearch = (keysearch) => {
    return {
        type: HANDLE_CHANGE_KEYSEARCH,
        payload: keysearch,
    };
};

getProductsList.propTypes = {
    size: PropTypes.number,
    page: PropTypes.number,
};
