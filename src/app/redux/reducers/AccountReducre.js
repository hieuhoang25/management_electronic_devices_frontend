import { GET_ACCOUNT_LIST } from '../actions/AccountAction';

const initialState = {
    accountList: [],
};

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_LIST:
            return {
                ...state,
                accountList: [...action.payload],
            };

        default:
            return state;
    }
};
export default AccountReducer;
