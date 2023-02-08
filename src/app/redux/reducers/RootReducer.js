import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';
import AccountReducer from './AccountReducre';
import ProductReducre from './ProductReducre';
import ProductFormReducer from './ProductFormReducer';

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
    accounts: AccountReducer,
    products: ProductReducre,
    productForm: ProductFormReducer,
});

export default RootReducer;
