import { SimpleCard } from 'app/components';
import CollapsibleTable from '../material-kit/tables/CollapsibleTable';
import { Container } from '../material-kit/tables/AppTable';

import { orderTableHeader } from 'app/utils/constant';

function AppOrder() {
    return (
        <Container>
            <SimpleCard title="Quản lý đơn hàng">
                <CollapsibleTable tableHeader={orderTableHeader} />
            </SimpleCard>
        </Container>
    );
}

export default AppOrder;
