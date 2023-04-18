import {
    GET_CATEGORY,
    GET_CATEGORY_SHOW_PRODUCT,
    HANDLE_CHANGE_CATEGORY,
    HANDLE_CHANGE_SUBCATEGORY,
    HANDLE_RESET_CATEGORY,
} from '../actions/CategoryAction';

const initalState = {
    data: [],

    // function for CURD PRODUCT
    categoryFilterNotChildren: [], //Only category_name and category_id
    subCategoryListProduct: [],
    subCategoryOfProduct: {},
    dataOfProduct: {},
    categoryOfProduct: {},
};

const CategoryReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            let newArray = action.payload.filter((obj) => {
                return obj.parent_id === null;
            });
            //lấy định dạng name và id
            const newCategoryFilter = [];
            newArray.forEach((element) => {
                let newObj = {
                    category_name: element.category_name,
                    category_id: element.id,
                };
                newCategoryFilter.push(newObj);
            });
            return {
                ...state,
                categoryFilterNotChildren: newCategoryFilter,
                data: action.payload,
            };
        case GET_CATEGORY_SHOW_PRODUCT: {
            var newCategoryOfProduct = action.payload.data.filter((obj) => {
                return obj.id === action.payload.id;
            });
            var category = action.payload.data.filter((obj) => {
                return obj.id === newCategoryOfProduct[0].parent_id;
            });
            var newSubCategoryList = [];
            category[0].categories.map((item) => {
                return (newSubCategoryList = [
                    ...newSubCategoryList,
                    { category_name: item.category_name, category_id: item.id },
                ]);
            });

            return {
                ...state,
                subCategoryOfProduct: {
                    category_name: newCategoryOfProduct[0].category_name,
                    category_id: newCategoryOfProduct[0].id,
                },
                subCategoryListProduct: newSubCategoryList,
                categoryOfProduct: {
                    category_name: category[0].category_name,
                    category_id: category[0].id,
                },
            };
        }
        case HANDLE_CHANGE_CATEGORY:
            return {
                ...state,
                categoryOfProduct: action.payload.categoryOfProduct,
                subCategoryListProduct: action.payload.subCategoryList,
                subCategoryOfProduct: '',
            };
        case HANDLE_CHANGE_SUBCATEGORY:
            return {
                ...state,
                subCategoryOfProduct: action.payload,
            };
        case HANDLE_RESET_CATEGORY:
            console.log('reset category');
            return {
                data: [],
                categoryFilterNotChildren: [],
                subCategoryListProduct: [],
                subCategoryOfProduct: {},
                dataOfProduct: {},
                categoryOfProduct: {},
            };
        default:
            return {
                ...state,
            };
    }
};
export default CategoryReducer;
