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
import { useEffect, useState } from 'react';
import DialogBonik from '../dialog/DialogBonik';
import { formBrand } from 'app/views/brands/AppBrand';
import axios from 'axios.js';
import SnackbarCusom from '../dialog/SnackbarCustom';
import DialogConfirm from 'app/views/product/Dialog/DialogConfirm';

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));

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
        page,
        rowsPerPage,
        handleChangeRowsPerPage,
        handleChangePage,
        tableName,
        reRender,
        setReRender,
        loading,
        setLoading,
        // eslint-disable-next-line
    } = props;
    const [open, setOpen] = useState(false);
    const [brandSelected, setBrandSelected] = useState();
    const [form, setForm] = useState({});

    const [data, setData] = useState([]);
    const [snackBar, setSnackbar] = useState({ response: null, type: '' });
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [idSelected, setIdSelected] = useState();

    function handleClickOpen(object) {
        setForm(object);
        setBrandSelected(object);
        setOpen(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setReRender(!reRender);
    };
    function handleClose() {
        setForm('');
        setOpen(false);
        setReRender(!reRender);
    }
    // eslint-disable-next-line
    useEffect(async () => {
        setLoading(true);
        if (tableName === 'brand') {
            const res = await axios
                .get(process.env.REACT_APP_BASE_URL + 'brand')
                .catch((error) => console.log(error));
            setData(res.data);
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [reRender]);
    const handleDelete = async (id) => {
        setIdSelected(id);
        setOpenConfirm(true);
    };
    const handleConfirmUpdate = async () => {
        setLoadButton(true);
        setOpenConfirm(true);
        if (tableName === 'brand') {
            let res = await axios
                .delete(process.env.REACT_APP_BASE_URL + 'brand/' + idSelected)
                .catch((error) => (res = error.response));

            setSnackbar((pre) => {
                return { ...pre, type: 'delete', response: res };
            });
        }

        setLoadButton(false);
    };
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
                                                    onClick={() => {
                                                        handleClickOpen(
                                                            subscriber,
                                                        );
                                                    }}
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
                                                    onClick={() => {
                                                        handleDelete(
                                                            subscriber.id,
                                                        );
                                                    }}
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
            {brandSelected && (
                <DialogBonik
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    dialogName="Cập nhật thương hiệu"
                    typeDialog="update"
                    formBrand={formBrand}
                    data={brandSelected}
                    form={form}
                    setForm={setForm}
                />
            )}
            {snackBar.response && (
                <SnackbarCusom
                    response={snackBar.response}
                    type={snackBar.type}
                />
            )}
            {openConfirm && (
                <DialogConfirm
                    openConfirm={openConfirm}
                    handleClose={handleClose}
                    handleCloseConfirm={handleCloseConfirm}
                    handleConfirmUpdate={handleConfirmUpdate}
                    loading={loadButton}
                />
            )}
        </Box>
    );
};

export default PaginationTable;
