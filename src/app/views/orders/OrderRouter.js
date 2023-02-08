import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppOrder = Loadable(lazy(() => import('./AppOrder')));

const OrderRouter = [
    {
        path: '/order',
        element: <AppOrder />,
    },
];
export default OrderRouter;
