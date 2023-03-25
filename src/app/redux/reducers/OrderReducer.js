import { GET_ORDER_LIST } from '../actions/OrderAction';

const initialState = {
    list: [],
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_LIST:
            return {
                ...state,
                list: [...action.payload],
            };

        default:
            return state;
    }
};
export default OrderReducer;
