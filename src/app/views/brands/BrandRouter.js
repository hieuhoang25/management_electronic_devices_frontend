import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppBrand = Loadable(lazy(() => import('./AppBrand')));

const BrandRouter = [
    {
        path: '/brand',
        element: <AppBrand />,
    },
];
export default BrandRouter;
