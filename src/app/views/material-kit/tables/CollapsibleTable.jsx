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
import { TablePagination } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderList } from 'app/redux/actions/OrderAction';
import { format, parseISO } from 'date-fns';
import { formatCurrency } from 'app/utils/utils';
import Alert from '@mui/material/Alert';
import axiosInstance from 'axios.js';
import { useState } from 'react';
import Loading from 'app/components/MatxLoading';

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));
function Row({ ...props }) {
    const { row, reload, setReload, setLoading } = props;
    const [open, setOpen] = React.useState(false);
    const handleChangeStatusOrder = (object) => {
        setLoading(true);
        axiosInstance
            .post(process.env.REACT_APP_BASE_URL + 'order/status-change', {
                order: object,
            })
            .then((res) => {
                setReload(!reload);
                console.log(res);
            });
    };

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
                <TableCell component="th" scope="row">
                    {row.user_fullName}
                </TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                    {format(
                        parseISO(row.created_date, 1),
                        'HH:mm:ss dd/MM/yyyy',
                    ).toString()}
                </TableCell>

                <TableCell align="center">{formatCurrency(row.sum)}</TableCell>
                <TableCell align="center">
                    {row.is_pay ? (
                        <Alert severity="success">Đã TT</Alert>
                    ) : (
                        <Alert severity="warning">Chưa TT</Alert>
                    )}
                </TableCell>
                <TableCell align="center">
                    <StyledButton
                        disabled={
                            (row.status_name === 'Hoàn thành' ? true : false ) || 
                            (row.status_name === 'Đã hủy' ? true : false )
                        }
                        variant="contained"
                        color={row.status_name === 'Chờ xác nhận' ? 'error':'primary'}
                        onClick={() => {
                            handleChangeStatusOrder(row);
                        }}
                    >
                        {row.status_name}
                    </StyledButton>
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
                                        <TableCell>Tên sản phầm</TableCell>
                                        <TableCell>Màu</TableCell>
                                        <TableCell align="center">
                                            Số lượng
                                        </TableCell>
                                        <TableCell align="center">
                                            Tổng giá ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.orderDetails.map((historyRow) => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {
                                                    historyRow.productVariant_displayName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    historyRow.productVariant_color_name
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {historyRow.quantity}
                                            </TableCell>
                                            <TableCell align="center">
                                                {formatCurrency(
                                                    historyRow.price_sum,
                                                )}
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

// Row.propTypes = {
//     row: PropTypes.shape({
//         fullname: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//         phone: PropTypes.string.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.number.isRequired,
//                 date: PropTypes.number.isRequired,
//             }),
//         ).isRequired,
//         createDate: PropTypes.string.isRequired,
//         updateDate: PropTypes.string.isRequired,
//     }).isRequired,
// };
// start compare
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
export default function CollapsibleTable({ tableHeader ,orders, setLoading, setReload,reload, loading }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
    // const orders = useSelector((state) => state.orders);
    // const [reload, setReload] = useState(true);
    // const [loading, setLoading] = useState(false);

    console.log("table"+orders)
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    // eslint-disable-next-line
    // useEffect(async () => {
    //     setLoading(true);

    //     await dispatch(getOrderList());

    //     setLoading(false);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [reload]);

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
                        {tableHeader.map((value, index) =>
                            index === 0 ? ( // mặc đinh giá trị đầu tiên ko có align = center
                                <TableCell
                                    sx={{ fontSize: '100%' }}
                                    key={index}
                                >
                                    {value}{' '}
                                </TableCell>
                            ) : (
                                <TableCell
                                    sx={{ fontSize: '100%' }}
                                    align="center"
                                    key={index}
                                >
                                    {value}
                                </TableCell>
                            ),
                        )}
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

                    {orders.list.length > 0 &&
                        orders.list
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((row, index) => (
                                <Row
                                    key={index}
                                    row={row}
                                    reload={reload}
                                    setReload={setReload}
                                    setLoading={setLoading}
                                />
                            ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={orders.list.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
        </Box>
    );
}
