import axios from 'axios.js';

export const GET_BRAND_PRODUCT = 'getBrandProduct';
export const HANDLE_CHANGE_BRAND = 'handleChangeBrand';
export const GET_ALL_BRAND = 'getAllBrand';

export const getBrandProduct = (productId) => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'brand').then((res) => {
        dispatch({
            type: GET_BRAND_PRODUCT,
            payload: { data: res.data, productId: productId },
        });
    });
};
export const handleChangeBrand = (brandOfProduct) => {
    return {
        type: HANDLE_CHANGE_BRAND,
        payload: brandOfProduct,
    };
};

export const getAllBrand = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_BASE_URL + 'brand');
    dispatch({
        type: GET_ALL_BRAND,
        payload: res.data,
    });
};
