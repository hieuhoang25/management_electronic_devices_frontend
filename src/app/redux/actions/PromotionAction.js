import axios from 'axios.js';

export const GET_PROMOTION_PRODUCT_WITH_PROMOTIONID =
    'getPromotionProductWithPromotionId';
export const HANDLE_CHANGE_PROMOTION = 'handleChangePromotion';
export const GET_ALL_PROMOTION = 'getAllPromotion';

export const getPromotionProductWithPromotionId =
    (promotionId) => (dispatch) => {
        axios.get('/api/admin/promotion-product').then((res) => {
            dispatch({
                type: GET_PROMOTION_PRODUCT_WITH_PROMOTIONID,
                payload: { data: res.data, promotionId: promotionId },
            });
        });
    };
export const handleChangePromotion = (promotionOfProduct) => {
    return {
        type: HANDLE_CHANGE_PROMOTION,
        payload: promotionOfProduct,
    };
};

export const getAllPromotion = () => (dispatch) => {
    axios.get('/api/admin/promotion-product').then((res) => {
        dispatch({
            type: GET_ALL_PROMOTION,
            payload: res.data,
        });
    });
};
