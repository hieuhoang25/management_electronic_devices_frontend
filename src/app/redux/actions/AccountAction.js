import axios from 'axios.js';

export const GET_ACCOUNT_LIST = 'getAccountList';
export const UPDATE_ROLE = 'updateRole';
export const SET_PAGENUMBER_ACCOUNT = 'setPageNumberAccount';
export const HANDLE_CHANGE_KEYSEARCH_ACCOUNT = 'handleChangeKeysearchAccount';
export const HANDLE_CHANGE_ROLE = 'handleChangeRole';
export const GET_ACCOUNTS_FILTERS = 'getAccountsFilter';

export const getAccountList = (size, page) => async (dispatch) => {
    const res = await axios.get(
        process.env.REACT_APP_BASE_URL +
            'account' +
            '?size=' +
            size +
            '&page=' +
            page,
    );
    dispatch({
        type: GET_ACCOUNT_LIST,
        payload: res.data,
    });
};
export const getAccountsFilter =
    (size, page, search, roleId) => async (dispatch) => {
        await axios
            .get(
                process.env.REACT_APP_BASE_URL +
                    'account/search?size=' +
                    size +
                    '&page=' +
                    page +
                    '&search=' +
                    search +
                    '&roleId=' +
                    roleId,
            )
            .then((res) => {
                dispatch({
                    type: GET_ACCOUNTS_FILTERS,
                    payload: res.data.data,
                });
            });
    };
export const updateRole = (roleId, accountId) => async (dispatch) => {
    await axios
        .get(
            process.env.REACT_APP_BASE_URL +
                'account/updateRole' +
                '?roleId=' +
                roleId +
                '&accountId=' +
                accountId,
        )
        .then((res) => {
            dispatch({
                type: UPDATE_ROLE,
            });
        });
};
export const setPageNumberAccount = (page) => {
    return {
        type: SET_PAGENUMBER_ACCOUNT,
        payload: page,
    };
};
export const handleChangeKeysearchAccount = (keysearch) => {
    return {
        type: HANDLE_CHANGE_KEYSEARCH_ACCOUNT,
        payload: keysearch,
    };
};
export const handleChangeRole = (role) => {
    return {
        type: HANDLE_CHANGE_ROLE,
        payload: role,
    };
};
