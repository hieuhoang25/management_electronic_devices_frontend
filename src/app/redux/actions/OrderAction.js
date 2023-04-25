import axios from 'axios.js';

export const GET_ORDER_LIST = 'getOrderList';

export const GET_LIST_COUNTION_ORDER = 'getListCountionOrder';

export const getOrderList = (status) => async (dispatch) => {
    // process.env.REACT_APP_BASE_URL + `order?status=${status}`
    await axios.get(process.env.REACT_APP_BASE_URL + `order?status=${status}`).then((res) => {
        dispatch({
            type: GET_ORDER_LIST,
            payload: res.data,
        });
    });
};

export const getListCountionOrder = () => async (dispatch) => {
    await axios.get(process.env.REACT_APP_BASE_URL + `order/count-status`).then((res) => {
        dispatch({
            type: GET_LIST_COUNTION_ORDER,
            payload: res.data,
        });
        console.log(res.data)
    });
   
};