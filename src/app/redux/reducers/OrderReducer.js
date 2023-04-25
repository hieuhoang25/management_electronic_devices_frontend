import { GET_ORDER_LIST, GET_LIST_COUNTION_ORDER } from '../actions/OrderAction';

const initialState = {
    list: [],
    listCountion:{}
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                list: [...action.payload],
            };
        case GET_LIST_COUNTION_ORDER:
                return {
                    ...state,
                    listCountion : action.payload,
                };    

        default:
            return state;
    }
};
export default OrderReducer;
