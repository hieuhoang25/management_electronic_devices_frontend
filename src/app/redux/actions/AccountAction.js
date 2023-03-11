import axios from 'axios.js';

export const GET_ACCOUNT_LIST = 'getAccountList';

export const getAccountList = (size, page) => (dispatch) => {
    axios
        .get(
            process.env.REACT_APP_BASE_URL +
                '?size=' +
                { size } +
                '&page=' +
                { page },
        )
        .then((res) => {
            dispatch({
                type: GET_ACCOUNT_LIST,
                payload: res.data,
            });
        });
};
