import axios from 'axios.js';

export const GET_ORDER_LIST = 'getOrderList';

export const getOrderList = () => async (dispatch) => {
    await axios.get(process.env.REACT_APP_BASE_URL + 'order').then((res) => {
        dispatch({
            type: GET_ORDER_LIST,
            payload: res.data,
        });
    });
};
