import {
    PUT_PRODUCT_ATTRIBUTE,
    DELETE_PRODUCT_ATTRIBUTE,
    GET_PRODUCT_ATTRIBUTE,
    ADD_ID_TO_STORE,
    RESET_PRODUCT_ATTRIBUTE,
    ADD_NEW_FORM,
    UPDATE_PRODUCTATB_IN_STORE,
} from '../actions/ProductAttributeAction';

const initalState = {
    data: [],
    listIdToDelete: [],
    idProduct: '',
    formNew: {},
};

const ProductAttributeReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_PRODUCT_ATTRIBUTE: {
            return {
                ...state,
                listIdToDelete: [],
                data: action.payload.data,
                // idProduct: action.payload.data ? action.payload.product_id : '',
                idProduct: action.payload.product_id,
            };
        }
        //thêm id cần xoá vào store
        case ADD_ID_TO_STORE: {
            var loadData, objWithIndex, checkIdNotExist;
            if (!state.listIdToDelete.includes(action.payload)) {
                checkIdNotExist = [...state.listIdToDelete, action.payload];
                objWithIndex = state.data.findIndex(
                    (obj) => obj.id === action.payload,
                );

                if (objWithIndex > -1) {
                    // eslint-disable-next-line
                    loadData = state.data.splice(objWithIndex, 1);
                }
            } else {
                checkIdNotExist = [...state.listIdToDelete];
            }
            return {
                ...state,
                listIdToDelete: checkIdNotExist,
            };
        }
        case DELETE_PRODUCT_ATTRIBUTE: {
            return {
                ...state,
                listIdToDelete: [],
            };
        }
        case RESET_PRODUCT_ATTRIBUTE: {
            return {
                ...state,
                listIdToDelete: [],
                data: [],
            };
        }
        case ADD_NEW_FORM: {
            return {
                ...state,
                formNew: [...state.formNew, action.payload],
            };
        }
        case PUT_PRODUCT_ATTRIBUTE: {
            return {
                ...state,
            };
        }
        case UPDATE_PRODUCTATB_IN_STORE: {
            var indexSelected = state.data.findIndex(
                (obj) => obj.id === action.payload.id,
            );
            var newData = state.data;
            newData[indexSelected].attribute_value = action.payload.value;

            return {
                ...state,
                data: newData,
            };
        }
        default:
            return state;
    }
};

export default ProductAttributeReducer;
