import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';
import AccountReducer from './AccountReducre';
import ProductFormReducer from './ProductFormReducer';
import ProductReducer from './ProductReducer';
import CategoryReducer from './CategoryReducer';
import ProductAttributeReducer from './ProductAttributeReducer';
import BrandReducer from './BrandReducer';
import PromotionReducer from './PromotionReducer';

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
    accounts: AccountReducer,
    productForm: ProductFormReducer,
    products: ProductReducer,
    productAttribute: ProductAttributeReducer,
    categories: CategoryReducer,
    brands: BrandReducer,
    promotions: PromotionReducer,
});

export default RootReducer;
