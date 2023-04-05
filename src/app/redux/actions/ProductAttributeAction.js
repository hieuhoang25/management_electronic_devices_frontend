import axios from 'axios.js';

export const POST_PRODUCT_ATTRIBUTE = 'createProductAttribute';
export const PUT_PRODUCT_ATTRIBUTE = 'updateProductAttribute';
export const DELETE_PRODUCT_ATTRIBUTE = 'deleteProductAttribute';
export const GET_PRODUCT_ATTRIBUTE = 'getProductAttribute';
export const ADD_ID_TO_STORE = 'addIdToStore';
export const RESET_PRODUCT_ATTRIBUTE = 'resetProductAttribute';
export const ADD_NEW_FORM = 'addNewForm';
export const UPDATE_PRODUCTATB_IN_STORE = 'updateProductAtbInStore';

export const getProductAttribute = (id) => async (dispatch) => {
    await axios
        .get(process.env.REACT_APP_BASE_URL + 'product-attribute/' + id)
        .then((res) => {
            dispatch({
                type: GET_PRODUCT_ATTRIBUTE,
                payload: { data: res.data, product_id: id },
            });
        });
};

export const createProductAttribute = (object) => async (dispatch) => {
    await axios
        .post(process.env.REACT_APP_BASE_URL + 'product-attribute', object)
        .then((res) => {
            dispatch({
                type: POST_PRODUCT_ATTRIBUTE,
                payload: res.data,
            });
        });
};
export const updateProductAttribute = (object) => async (dispatch) => {
    await axios
        .put(process.env.REACT_APP_BASE_URL + 'product-attribute', object)
        .then((res) => {
            dispatch({
                type: PUT_PRODUCT_ATTRIBUTE,
                // payload: res.data,
            });
        });
};
export const deleteProductAttribute = (listId) => async (dispatch) => {
    await axios
        .delete(process.env.REACT_APP_BASE_URL + 'product-attribute', {
            data: listId,
        })
        .then((res) => {
            dispatch({
                type: DELETE_PRODUCT_ATTRIBUTE,
                // payload: res.data,
            });
        });
};
export const resetProductAttribute = (id) => (dispatch) => {
    axios
        .get(process.env.REACT_APP_BASE_URL + 'product-attribute/' + id)
        .then((res) => {
            dispatch({
                type: ADD_ID_TO_STORE,
                payload: res.data,
            });
        });
};
// thêm vào store list id để call api xoá các id có trong list
export const addIdToStore = (id) => {
    return {
        type: ADD_ID_TO_STORE,
        payload: id,
    };
};

export const addNewForm = (object) => {
    return {
        type: ADD_NEW_FORM,
        payload: object,
    };
};
export const updateProductAtbInStore = (id, value) => {
    return {
        type: UPDATE_PRODUCTATB_IN_STORE,
        payload: { id: id, value: value },
    };
};
