import axios from 'axios.js';
export const GET_ALL_STORAGE = 'getAllStorage';
export const HANDLE_CHANGE_STORAGE = 'handleChangeStorage';
export const CLEAR_STORAGE_SELECTED = 'clearStorageSelected';

export const getAllStorage = () => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'storage').then((res) => {
        dispatch({
            type: GET_ALL_STORAGE,
            payload: res.data,
        });
    });
};

export const handleChangeStorage = (storage) => {
    return {
        type: HANDLE_CHANGE_STORAGE,
        payload: storage,
    };
};
export const clearStorageSelected = () => {
    return {
        type: CLEAR_STORAGE_SELECTED,
    };
};
