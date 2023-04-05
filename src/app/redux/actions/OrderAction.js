import axios from 'axios.js';

export const GET_ORDER_LIST = 'getOrderList';

export const getOrderList = () => (dispatch) => {
    axios.get('/api/admin/order').then((res) => {
        dispatch({
            type: GET_ORDER_LIST,
            payload: res.data,
        });
    });
};
