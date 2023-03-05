import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';
import AccountReducer from './AccountReducre';
import ProductFormReducer from './ProductFormReducer';
import ProductReducer from './ProductReducer';
import ProductAttributeReducer from './ProductAttributeReducer';

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
    accounts: AccountReducer,
    productForm: ProductFormReducer,
    products: ProductReducer,
    productAttribute: ProductAttributeReducer,
});

export default RootReducer;
