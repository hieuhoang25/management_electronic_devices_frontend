import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import AccountsRouter from './views/accounts/AccountsRouter';
import ProductRouter from './views/product/ProductRouter';
import OrderRouter from './views/orders/OrderRouter';
import ColorStorageRouter from './views/color-storage/ColorStorageRouter';
import CategoryRouter from './views/category/CategoryRouter';
import BrandRouter from './views/brands/BrandRouter';

const routes = [
    {
        element: (
            <AuthGuard>
                <MatxLayout />
            </AuthGuard>
        ),
        children: [
            ...dashboardRoutes,
            ...chartsRoute,
            ...materialRoutes,
            ...ProductRouter,
            ...AccountsRouter,
            ...OrderRouter,
            ...ColorStorageRouter,
            ...CategoryRouter,
            ...BrandRouter,
        ],
    },
    ...sessionRoutes,
    { path: '/', element: <Navigate to="dashboard/default" /> },
    { path: '*', element: <NotFound /> },
];

export default routes;
