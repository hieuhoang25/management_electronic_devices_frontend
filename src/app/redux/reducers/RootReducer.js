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
import ProductVariantReducer from './ProductVariantReducer';
import ColorReducer from './ColorReducer';
import StorageReducer from './StorageRecuder';
import OrderReducer from './OrderReducer';

import StatisticReducer from './StatisticReduce'
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
    productVariant: ProductVariantReducer,
    color: ColorReducer,
    storage: StorageReducer,
    statistic: StatisticReducer,
    orders: OrderReducer,
});

export default RootReducer;
