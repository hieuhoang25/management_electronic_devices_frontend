import axios from 'axios';

export const GET_ACCOUNT_LIST = 'getAccountList';

export const getAccountList = () => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'accounts').then((res) => {
        dispatch({
            type: GET_ACCOUNT_LIST,
            payload: res.data,
        });
    });
};
