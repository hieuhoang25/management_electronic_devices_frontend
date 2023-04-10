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
import { Alert, Grid, Pagination, Radio, Snackbar } from '@mui/material';
import { Stack } from '@mui/system';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
    getAccountList,
    getAccountsFilter,
    setPageNumberAccount,
    updateRole,
} from 'app/redux/actions/AccountAction';
import { useEffect } from 'react';
import Loading from 'app/components/MatxLoading';
import { format, parseISO } from 'date-fns';
const GreenRadio = styled(Radio)(() => ({
    color: green[400],
    '&$checked': { color: green[600] },
}));

function Row(props) {
    const { row, callBack = () => {}, setOpenSnackBar = () => {} } = props;
    const [open, setOpen] = React.useState(false);
    const accounts = useSelector((state) => state.accounts);

    const dispatch = useDispatch();
    function handleChangeRadio(roleId, accountId) {
        setOpenSnackBar(true);
        dispatch(updateRole(roleId, accountId));
        dispatch(getAccountList(5, accounts.pageNumber - 1));
        callBack();
        setOpenSnackBar(true);
    }
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
                    {row.username}
                </TableCell>
                <TableCell align="center">{row.user.fullName} </TableCell>
                <TableCell align="center">{row.user.phone}</TableCell>
                <TableCell align="center">{row.user.email}</TableCell>
                <TableCell align="center">
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                            <Radio
                                value="USER"
                                color="default"
                                onChange={(e) => {
                                    handleChangeRadio(1, row.id);
                                }}
                                name="radio-button-demo"
                                checked={
                                    row.authorities[0].role_name === 'USER'
                                }
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            {'User'}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <GreenRadio
                                value="ADMIN"
                                color="default"
                                onChange={(e) => {
                                    handleChangeRadio(2, row.id);
                                }}
                                name="radio-button-demo"
                                checked={
                                    row.authorities[0].role_name === 'ADMIN'
                                }
                                inputProps={{ 'aria-label': 'B' }}
                            />
                            {'Admin'}
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
                                Thông tin chi tiết
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell>Số nhà</TableCell>
                                        <TableCell>Phường/Xã</TableCell>
                                        <TableCell>Quận/Huyện</TableCell>
                                        <TableCell>Thành phố/Tỉnh</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {format(
                                                parseISO(
                                                    row.user.createDate,
                                                    1,
                                                ),
                                                'HH:mm:ss dd/MM/yyyy ',
                                            ).toString()}
                                        </TableCell>

                                        {row.user.addresses.length > 0 && (
                                            <>
                                                <TableCell>
                                                    {
                                                        row.user.addresses[0]
                                                            .address_line
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        row.user.addresses[0]
                                                            .wards
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        row.user.addresses[0]
                                                            .district
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        row.user.addresses[0]
                                                            .province
                                                    }
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
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
export default function AccountTable({ tableHeader }) {
    const accounts = useSelector((state) => state.accounts);
    const dispatch = useDispatch();
    const [reload, setReload] = useState(true);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const handleChangePage = (_, newPage) => {
        dispatch(setPageNumberAccount(newPage));
        setReload(!reload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setLoading(true);

        if (accounts.role.id !== -1 || accounts.keysearch !== '') {
            await dispatch(
                getAccountsFilter(
                    5,
                    accounts.pageNumber - 1,
                    accounts.keysearch,
                    accounts.role.id,
                ),
            );
            setLoading(false);
            return;
        }
        await dispatch(getAccountList(5, accounts.pageNumber - 1));
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, accounts.role, accounts.keysearch]);
    const callBackStateReload = () => {
        setReload(!reload);
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
                                key={index}
                            >
                                {value}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.data &&
                        accounts.data.map((row, index) => (
                            <Row
                                key={index}
                                row={row}
                                callBack={callBackStateReload}
                                setOpenSnackBar={setOpenSnackBar}
                                openSnackBar={openSnackBar}
                            />
                        ))}
                </TableBody>
            </StyledTable>

            <Stack justifyContent="center" alignItems="center" mt={3}>
                <Pagination
                    count={accounts.totalPage}
                    page={accounts.pageNumber}
                    onChange={handleChangePage}
                />
            </Stack>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={1500}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    md={{ width: '100%' }}
                >
                    'Cập nhật thành công'
                </Alert>
            </Snackbar>
        </Box>
    );
}
