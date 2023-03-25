import {
    GET_ACCOUNT_LIST,
    UPDATE_ROLE,
    SET_PAGENUMBER_ACCOUNT,
    HANDLE_CHANGE_KEYSEARCH_ACCOUNT,
    HANDLE_CHANGE_ROLE,
    GET_ACCOUNTS_FILTERS,
} from '../actions/AccountAction';

const initialState = {
    data: [],
    totalPage: 1,
    pageNumber: 1,
    keysearch: '',
    role: { label: 'Hiển thị tất cả', id: -1 },
};

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            return {
                ...state,
                data: action.payload.data,
                totalPage: action.payload.totalPage,
            };
        case UPDATE_ROLE:
            return {
                ...state,
            };
        case GET_ACCOUNTS_FILTERS:
            return {
                ...state,
                data: action.payload.data,
                totalPage: action.payload.totalPage,
            };
        case SET_PAGENUMBER_ACCOUNT:
            return {
                ...state,
                pageNumber: action.payload,
            };
        case HANDLE_CHANGE_KEYSEARCH_ACCOUNT:
            return {
                ...state,
                keysearch: action.payload,
            };
        case HANDLE_CHANGE_ROLE:
            return {
                ...state,
                role: action.payload,
            };

        default:
            return state;
    }
};
export default AccountReducer;
