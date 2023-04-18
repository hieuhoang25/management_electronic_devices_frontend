import axios from 'axios.js';

export const GET_CATEGORY = 'getCategory';
export const GET_CATEGORY_SHOW_PRODUCT = 'getCategoryShowProduct';
export const HANDLE_CHANGE_CATEGORY = 'handleChangleCategory';
export const HANDLE_CHANGE_SUBCATEGORY = 'handleChangeSubcategory';
export const HANDLE_RESET_CATEGORY = 'handleResetCategory';

export const getCategory = () => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'category').then((res) => {
        dispatch({
            type: GET_CATEGORY,
            payload: res.data,
        });
    });
};
export const getCategoryShowProduct = (categoryId) => (dispatch) => {
    axios.get(process.env.REACT_APP_BASE_URL + 'category').then((res) => {
        dispatch({
            type: GET_CATEGORY_SHOW_PRODUCT,
            payload: { data: res.data, id: categoryId },
        });
    });
};

export const handleChangeCategory = (categoryOfProduct, subCategoryList) => {
    return {
        type: HANDLE_CHANGE_CATEGORY,
        payload: {
            categoryOfProduct: categoryOfProduct,
            subCategoryList: subCategoryList,
        },
    };
};

export const handleChangeSubcategory = (subcategoryOfProduct) => {
    return {
        type: HANDLE_CHANGE_SUBCATEGORY,
        payload: subcategoryOfProduct,
    };
};
