import {
    GET_PROMOTION_PRODUCT_WITH_PROMOTIONID,
    HANDLE_CHANGE_PROMOTION,
    GET_ALL_PROMOTION,
} from '../actions/PromotionAction';

const initalState = {
    data: [],
    promotionProduct: [],

    // function for CURD PRODUCT
    promotionFilterOfProduct: [],
    promotionOfProduct: {},
};

const PromotionReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_PROMOTION:
            var newPromotionFilter = [];
            // eslint-disable-next-line
            action.payload.map((items) => {
                let item = {
                    promotion_name: items.name,
                    promotion_id: items.id,
                };
                newPromotionFilter.push(item);
            });
            return {
                ...state,
                data: newPromotionFilter,
            };
        case GET_PROMOTION_PRODUCT_WITH_PROMOTIONID:
            var newPromotionFilterOfProduct = [];
            // eslint-disable-next-line
            action.payload.data.map((items) => {
                let item = {
                    promotion_name: items.name,
                    promotion_id: items.id,
                };
                newPromotionFilterOfProduct.push(item);
            });
            var newPromotionOfProduct = newPromotionFilterOfProduct.filter(
                (obj) => {
                    return obj.promotion_id === action.payload.promotionId;
                },
            );

            return {
                ...state,
                promotionProduct: action.payload,
                promotionFilterOfProduct: newPromotionFilterOfProduct,
                promotionOfProduct: newPromotionOfProduct[0],
            };
        case HANDLE_CHANGE_PROMOTION:
            return {
                ...state,
                promotionOfProduct: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default PromotionReducer;
