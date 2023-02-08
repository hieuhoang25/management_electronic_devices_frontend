import * as React from 'react';
import PropTypes from 'prop-types';
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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // console.log(row);

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
                    {row.fullname}
                </TableCell>
                <TableCell align="center">{row.email} </TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.createDate}</TableCell>
                <TableCell align="center">{row.updateDate}</TableCell>
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
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="center">
                                            Amount
                                        </TableCell>
                                        <TableCell align="center">
                                            Total price ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.customerId}
                                            </TableCell>
                                            <TableCell align="center">
                                                {historyRow.amount}
                                            </TableCell>
                                            <TableCell align="center">
                                                {Math.round(historyRow.amount) /
                                                    100}
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

Row.propTypes = {
    row: PropTypes.shape({
        fullname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.number.isRequired,
                date: PropTypes.number.isRequired,
            }),
        ).isRequired,
        createDate: PropTypes.string.isRequired,
        updateDate: PropTypes.string.isRequired,
    }).isRequired,
};
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
export default function CollapsibleTable({ tableHeader, rows }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {tableHeader.map((value, index) =>
                            index === 0 ? ( // mặc đinh giá trị đầu tiên ko có align = center
                                <TableCell key={index}>{value} </TableCell>
                            ) : (
                                <TableCell align="center" key={index}>
                                    {value}
                                </TableCell>
                            ),
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )
                        .map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={rows.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
        </Box>
    );
}
