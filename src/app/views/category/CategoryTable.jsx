import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from '@emotion/styled';
import { Grid, TablePagination } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from 'app/components/MatxLoading';
import ButtonProduct from '../product/ButtonProduct';
import { StyledButton } from '../brands/AppBrand';
import DialogBonik from '../material-kit/dialog/DialogBonik';
import DialogConfirm from '../product/Dialog/DialogConfirm';
import axios from 'axios.js';
import SnackbarCusom from '../material-kit/dialog/SnackbarCustom';

function Row({ ...props }) {
    const {
        row,
        tableChildHeader,
        handleClickOpen,
        setTypeTable,
        setForm,
        // eslint-disable-next-line
        form,
        setDialogName,
        setTypeDialog,
        handleDelete,
    } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.category_name}
                </TableCell>
                <TableCell align="center">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item maxWidth="50" align="center">
                            <ButtonProduct
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    // eslint-disable-next-line

                                    setForm(row);

                                    setDialogName('Cập nhật danh mục cha');
                                    setTypeDialog('update');
                                    setTypeTable('parent');
                                    handleClickOpen();
                                }}
                            >
                                Chỉnh sửa
                            </ButtonProduct>
                        </Grid>
                        <Grid item maxWidth="50" align="center">
                            <ButtonProduct
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => {
                                    handleDelete(row.id);
                                }}
                            >
                                Xoá
                            </ButtonProduct>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h2"
                                gutterBottom
                                component="div"
                            >
                                <Grid item>
                                    <StyledButton
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                            setTypeTable('child');
                                            setDialogName(
                                                'Thêm mới danh mục con',
                                            );
                                            setTypeTable('child');
                                            setForm(row);
                                            setTypeDialog('create');
                                            handleClickOpen();
                                        }}
                                    >
                                        Thêm mới danh mục con
                                    </StyledButton>
                                </Grid>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {tableChildHeader.map(
                                            (value, index) => (
                                                <TableCell
                                                    width="100%"
                                                    key={index}
                                                >
                                                    {value}
                                                </TableCell>
                                            ),
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.categories.length > 0 &&
                                        row.categories.map((value, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {value.category_name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        justifyContent="center"
                                                    >
                                                        <Grid
                                                            item
                                                            maxWidth="50"
                                                            align="center"
                                                        >
                                                            <ButtonProduct
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                onClick={() => {
                                                                    setDialogName(
                                                                        'Cập nhật danh mục con',
                                                                    );
                                                                    setForm(
                                                                        row
                                                                            .categories[
                                                                            index
                                                                        ],
                                                                    );
                                                                    setTypeTable(
                                                                        'child',
                                                                    );
                                                                    setTypeDialog(
                                                                        'update',
                                                                    );
                                                                    handleClickOpen();
                                                                }}
                                                            >
                                                                Chỉnh sửa
                                                            </ButtonProduct>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            maxWidth="50"
                                                            align="center"
                                                        >
                                                            <ButtonProduct
                                                                variant="outlined"
                                                                color="error"
                                                                size="small"
                                                                onClick={() => {
                                                                    handleDelete(
                                                                        value.id,
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
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));
const formCategoryParent = [{ label: 'Tên danh mục cha', type: 'text' }];
const formCategoryChild = [{ label: 'Tên danh mục con', type: 'text' }];
//end compare
export default function CategoryTable({ tableHeader, ...props }) {
    const { data, tableChildHeader, reRender, setReRender } = props;
    const [page, setPage] = React.useState(0);
    const [typeTable, setTypeTable] = useState();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [form, setForm] = useState();
    const [dialogName, setDialogName] = useState();
    const [typeDialog, setTypeDialog] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [idSelected, setIdSelected] = useState();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [snackBar, setSnackbar] = useState({ response: null, type: '' });
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        setCategorySelected(form);
        // eslint-disable-next-line
    }, [dialogName]);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function handleClickOpen() {
        setOpenDialog(true);
    }
    function handleClose() {
        setForm('');
        setOpenDialog(false);
        setReRender(!reRender);
    }
    const handleDelete = (id) => {
        setIdSelected(id);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setReRender(!reRender);
    };
    const handleConfirmUpdate = async () => {
        setLoadButton(true);
        setOpenConfirm(true);

        let res = await axios
            .delete(process.env.REACT_APP_BASE_URL + 'category/' + idSelected)
            .catch((error) => (res = error.response));

        setSnackbar((pre) => {
            return { ...pre, type: 'delete', response: res };
        });

        setLoadButton(false);
    };
    return loading === true ? (
        <>
            <Loading />
        </>
    ) : (
        <Box width="100%" overflow="auto">
            <Grid item>
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTypeTable('parent');
                        setDialogName('Thêm mới danh mục cha');
                        setTypeDialog('create');
                        handleClickOpen();
                    }}
                >
                    Thêm mới
                </StyledButton>
            </Grid>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {tableHeader.map((value, index) => (
                            <TableCell
                                sx={{ fontSize: '100%' }}
                                align="center"
                                width="100%"
                                key={index}
                            >
                                {value}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )
                        .map((row, index) => (
                            <Row key={index} row={row} />
                        ))} */}

                    {data.length > 0 &&
                        data.map((row, index) => (
                            <Row
                                key={index}
                                row={row}
                                reload={reRender}
                                setReload={setReRender}
                                setLoading={setLoading}
                                tableChildHeader={tableChildHeader}
                                handleClickOpen={handleClickOpen}
                                setTypeTable={setTypeTable}
                                setForm={setForm}
                                form={form}
                                setDialogName={setDialogName}
                                setTypeDialog={setTypeDialog}
                                setCategorySelected={setCategorySelected}
                                handleDelete={handleDelete}
                            />
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
            {openDialog && (
                <DialogBonik
                    open={openDialog}
                    setOpen={setOpenDialog}
                    handleClose={handleClose}
                    dialogName={dialogName}
                    typeDialog={typeDialog}
                    formCategory={
                        typeTable === 'parent'
                            ? formCategoryParent
                            : formCategoryChild
                    }
                    form={form}
                    setForm={setForm}
                    data={categorySelected}
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
            {snackBar.response && (
                <SnackbarCusom
                    response={snackBar.response}
                    type={snackBar.type}
                />
            )}
        </Box>
    );
}
