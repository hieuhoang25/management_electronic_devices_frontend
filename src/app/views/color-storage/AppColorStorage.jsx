import { SimpleCard } from 'app/components';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { Container } from '../material-kit/auto-complete/AppAutoComplete';
const ColorStorageTable = Loadable(lazy(() => import('./ColorStorageTable')));

function AppColorStorage() {
    return (
        <Container>
            <SimpleCard title="Quản lý màu sắc, dung lượng">
                <ColorStorageTable />
            </SimpleCard>
        </Container>
    );
}

export default AppColorStorage;
