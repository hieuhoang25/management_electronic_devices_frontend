import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppAccount = Loadable(lazy(() => import('./AppAccount')));

const AccountsRouter = [
    {
        path: '/account',
        element: <AppAccount />,
    },
];
export default AccountsRouter;
