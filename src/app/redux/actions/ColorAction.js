import axios from 'axios.js';
export const GET_ALL_COLOR = 'getAllColor';
export const HANDLE_CHANGE_COLOR = 'handleChangeColor';
export const CLEAR_COLOR_SELECTED = 'clearColorSelected';

export const getAllColor = () => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'color').then((res) => {
        dispatch({
            type: GET_ALL_COLOR,
            payload: res.data,
        });
    });
};
export const handleChangeColor = (color) => {
    return {
        type: HANDLE_CHANGE_COLOR,
        payload: color,
    };
};
export const clearColorSelected = () => {
    return {
        type: CLEAR_COLOR_SELECTED,
    };
};
