import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';
import AccountReducer from './AccountReducre';

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
    accounts: AccountReducer,
});

export default RootReducer;
