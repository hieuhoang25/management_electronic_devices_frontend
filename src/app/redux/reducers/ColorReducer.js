import {
    GET_ALL_COLOR,
    HANDLE_CHANGE_COLOR,
    CLEAR_COLOR_SELECTED,
} from '../actions/ColorAction';

const initalState = {
    data: [],
    colorSelected: {},
    colorFilter: [],
};

const ColorReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_COLOR:
            var newColorFilter = [];
            // eslint-disable-next-line
            action.payload.map((items) => {
                let item = {
                    color_name: items.color_name,
                    color_id: items.id,
                };

                newColorFilter.push(item);
            });
            return {
                ...state,
                data: action.payload,
                colorFilter: newColorFilter,
            };
        case HANDLE_CHANGE_COLOR:
            return {
                ...state,
                colorSelected: action.payload,
            };
        case CLEAR_COLOR_SELECTED:
            return {
                ...state,
                colorSelected: {},
            };
        default:
            return {
                ...state,
            };
    }
};
export default ColorReducer;
