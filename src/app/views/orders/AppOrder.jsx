import { SimpleCard } from 'app/components';
import CollapsibleTable from '../material-kit/tables/CollapsibleTable';
import { Container } from '../material-kit/tables/AppTable';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { orderTableHeader } from 'app/utils/constant';
import { getAccountList } from 'app/redux/actions/AccountAction';

function AppOrder(props) {
    const { getAccountList, accounts } = props;
    useEffect(() => {
        getAccountList();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <SimpleCard title="Quản lý đơn hàng">
                <CollapsibleTable
                    tableHeader={orderTableHeader}
                    rows={accounts.accountList}
                />
            </SimpleCard>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    getAccountList: PropTypes.func.isRequired,
    accounts: state.accounts,
});
export default connect(mapStateToProps, { getAccountList })(AppOrder);
