import {
    GET_ALL_STORAGE,
    HANDLE_CHANGE_STORAGE,
} from '../actions/StorageAction';

const initalState = {
    data: [],
    storageSelected: {},
    storageFilter: [],
};

const StorageReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_STORAGE:
            var newstorageFilter = [];
            // eslint-disable-next-line
            action.payload.map((items) => {
                let item = {
                    storage_name: items.storage_name,
                    storage_id: items.id,
                };
                newstorageFilter.push(item);
            });
            return {
                ...state,
                data: action.payload,
                storageFilter: newstorageFilter,
            };
        case HANDLE_CHANGE_STORAGE:
            return {
                ...state,
                storageSelected: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
export default StorageReducer;
