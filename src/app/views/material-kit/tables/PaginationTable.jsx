import {
    Box,
    Grid,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import Loading from 'app/components/MatxLoading';
import ButtonProduct from 'app/views/product/ButtonProduct';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));

// const subscribarList = [
//     {
//         name: 'john doe1',
//         date: '18 january, 2019',
//         amount: 1000,
//         status: 'close',
//         company: 'ABC Fintech LTD.',
//     },
//     {
//         name: 'kessy bryan',
//         date: '10 january, 2019',
//         amount: 9000,
//         status: 'open',
//         company: 'My Fintech LTD.',
//     },
//     {
//         name: 'kessy bryan',
//         date: '10 january, 2019',
//         amount: 9000,
//         status: 'open',
//         company: 'My Fintech LTD.',
//     },
//     {
//         name: 'james cassegne',
//         date: '8 january, 2019',
//         amount: 5000,
//         status: 'close',
//         company: 'Collboy Tech LTD.',
//     },
//     {
//         name: 'lucy brown',
//         date: '1 january, 2019',
//         amount: 89000,
//         status: 'open',
//         company: 'ABC Fintech LTD.',
//     },
//     {
//         name: 'lucy brown',
//         date: '1 january, 2019',
//         amount: 89000,
//         status: 'open',
//         company: 'ABC Fintech LTD.',
//     },
//     {
//         name: 'lucy brown',
//         date: '1 january, 2019',
//         amount: 89000,
//         status: 'open',
//         company: 'ABC Fintech LTD.',
//     },
//     {
//         name: 'lucy brown',
//         date: '1 january, 2019',
//         amount: 89000,
//         status: 'open',
//         company: 'ABC Fintech LTD.',
//     },
//     {
//         name: 'lucy brown',
//         date: '1 january, 2019',
//         amount: 89000,
//         status: 'open',
//         company: 'ABC Fintech LTD.',
//     },
// ];

const PaginationTable = ({ ...props }) => {
    const {
        tableHeader,
        data = [],
        page,
        rowsPerPage,
        handleChangeRowsPerPage,
        handleChangePage,
        tableName,
        loading = false,
        // eslint-disable-next-line
        setLoading,
    } = props;

    return loading === true ? (
        <Loading />
    ) : (
        <Box width="100%" overflow="auto" marginTop={3}>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {tableHeader &&
                            tableHeader.map((value, index) => (
                                <TableCell
                                    sx={{ fontSize: '100%' }}
                                    align="center"
                                    key={index}
                                >
                                    {value}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableName === 'brand' &&
                        data.length > 0 &&
                        data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {subscriber.brand_name}
                                    </TableCell>
                                    <TableCell>
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                        >
                                            <Grid item md={3}>
                                                <ButtonProduct
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    fullWidth
                                                    onClick={() => {}}
                                                >
                                                    Sửa
                                                </ButtonProduct>
                                            </Grid>

                                            <Grid item md={3}>
                                                <ButtonProduct
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    fullWidth
                                                    onClick={() => {}}
                                                >
                                                    Xoá
                                                </ButtonProduct>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={data.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
        </Box>
    );
};

export default PaginationTable;
