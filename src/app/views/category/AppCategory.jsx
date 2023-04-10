import { SimpleCard } from 'app/components';
import Loadable from 'app/components/Loadable';
import {
    categoryTableChildHeader,
    categoryTableHeader,
} from 'app/utils/constant';
import axios from 'axios.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { lazy } from 'react';
import { Container } from '../material-kit/auto-complete/AppAutoComplete';
const CategoryTable = Loadable(lazy(() => import('./CategoryTable')));
function AppCategory() {
    const [category, setCategory] = useState([]);
    const [reRender, setReRender] = useState(true);
    // eslint-disable-next-line
    useEffect(async () => {
        const categories = await axios.get(
            process.env.REACT_APP_BASE_URL + 'category',
        );

        const categoryParents = categories.data.filter((obj) => {
            return obj.parent_id === null;
        });
        setCategory(categoryParents);
    }, [reRender]);

    return (
        <Container>
            <SimpleCard title="Quản lý danh mục"></SimpleCard>
            <SimpleCard>
                <CategoryTable
                    tableHeader={categoryTableHeader}
                    tableChildHeader={categoryTableChildHeader}
                    data={category || []}
                    reRender={reRender}
                    setReRender={setReRender}
                />
            </SimpleCard>
        </Container>
    );
}

export default AppCategory;
