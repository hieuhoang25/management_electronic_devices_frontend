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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getOrderList } from 'app/redux/actions/OrderAction';
import { useState } from 'react';
import Loading from 'app/components/MatxLoading';
import ButtonProduct from '../product/ButtonProduct';

function Row({ ...props }) {
    const { row, tableChildHeader } = props;
    const [open, setOpen] = React.useState(false);

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
                                onClick={() => {}}
                            >
                                Chỉnh sửa
                            </ButtonProduct>
                        </Grid>
                        <Grid item maxWidth="50" align="center">
                            <ButtonProduct
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => {}}
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
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Chi tiết
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
                                                                onClick={() => {}}
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

//end compare
export default function CategoryTable({ tableHeader, ...props }) {
    const { data, tableChildHeader } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    // eslint-disable-next-line
    useEffect(async () => {
        setLoading(true);

        await dispatch(getOrderList());

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return loading === true ? (
        <>
            <Loading />
        </>
    ) : (
        <Box width="100%" overflow="auto">
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
                                reload={reload}
                                setReload={setReload}
                                setLoading={setLoading}
                                tableChildHeader={tableChildHeader}
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
        </Box>
    );
}
