import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppCategory = Loadable(lazy(() => import('./AppCategory')));

const CategoryRouter = [
    {
        path: '/category',
        element: <AppCategory />,
    },
];
export default CategoryRouter;
