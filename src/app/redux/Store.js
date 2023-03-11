import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';
// import storage from 'redux-persist/lib/storage'; // bỏ ẩn nếu dùng lưu vào local
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session'; // lưu vào session

const initialState = {};
const middlewares = [thunk];
let devtools = (x) => x;

//lưu state vào storage
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [''],
};

if (
    process &&
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const persistedReducer = persistReducer(persistConfig, RootReducer);
const Store1 = createStore(
    // RootReducer,
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools),
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = Store1;
    let persistor = persistStore(store);
    return { store, persistor };
};
