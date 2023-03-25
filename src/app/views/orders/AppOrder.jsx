import { SimpleCard } from 'app/components';
import CollapsibleTable from '../material-kit/tables/CollapsibleTable';
import { Container } from '../material-kit/tables/AppTable';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { orderTableHeader } from 'app/utils/constant';
import { getOrderList } from 'app/redux/actions/OrderAction';

function AppOrder(props) {
    const { getOrderList, orders } = props;
    useEffect(() => {
        getOrderList();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <SimpleCard title="Quản lý đơn hàng">
                <CollapsibleTable
                    tableHeader={orderTableHeader}
                    rows={orders.list}
                />
            </SimpleCard>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    getOrderList: PropTypes.func.isRequired,
    orders: state.orders,
});
export default connect(mapStateToProps, { getOrderList })(AppOrder);
