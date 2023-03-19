import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { accountTableHeader } from 'app/utils/constant';
import { createDataTableAccount } from 'app/utils/objects';
import CollapsibleTable from './CollapsibleTable';
import { FilterTable } from './FilterTable';
import PaginationTable from './PaginationTable';
import SimpleTable from './SimpleTable';

export const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));
const rows = [
    createDataTableAccount(
        'Frozen yoghurt',
        'long@gmail.com',
        20211212,
        '2021-12-12',
        '2021-12-12',
        'quan 12',
        // [
        //     {
        //         date: '2022',
        //         customerId: '123222',
        //         amount: 444,
        //         price: 1222,
        //     },
        // ],
    ),
    createDataTableAccount(
        'Testtt',
        'kasss@gmail.com',
        20211212,
        '2021-12-12',
        '2021-12-12',
        'quan 12',
        [
            {
                date: '2022',
                customerId: '000',
                amount: 2,
                price: 222,
            },
        ],
    ),
];
const AppTable = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Table' },
                    ]}
                />
            </Box>

            <SimpleCard title="Simple Table">
                <SimpleTable />
            </SimpleCard>

            <SimpleCard title="Pagination Table">
                <PaginationTable />
            </SimpleCard>

            <SimpleCard title="Coolapsible Table">
                <CollapsibleTable
                    tableHeader={accountTableHeader}
                    rows={rows}
                />
            </SimpleCard>

            <SimpleCard title="filter table">
                <FilterTable />
            </SimpleCard>
        </Container>
    );
};

export default AppTable;
