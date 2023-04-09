import {
    Box,
    Grid,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import ButtonProduct from '../product/ButtonProduct';

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));

const ColorStorageTable = ({ ...props }) => {
    const {
        tableHeader,
        data,
        tableName,
        page,
        rowsPerPage,
        handleChangeRowsPerPage,
        handleChangePage,
    } = props;

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {tableHeader.map((value, index) => (
                            <TableCell
                                key={index}
                                sx={{ fontSize: '100%' }}
                                align="center"
                            >
                                {value}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableName === 'color'
                        ? data
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage,
                              )
                              .map((subscriber, index) => (
                                  <TableRow key={index}>
                                      <TableCell align="center">
                                          {subscriber.color_name}
                                      </TableCell>
                                      <TableCell align="center">
                                          <Grid
                                              container
                                              justifyContent="center"
                                          >
                                              <Grid
                                                  item
                                                  maxWidth="50"
                                                  align="center"
                                              >
                                                  <ButtonProduct
                                                      variant="contained"
                                                      color="primary"
                                                      size="small"
                                                      onClick={() => {}}
                                                  >
                                                      Chỉnh sửa
                                                  </ButtonProduct>
                                              </Grid>
                                          </Grid>
                                      </TableCell>
                                  </TableRow>
                              ))
                        : data
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage,
                              )
                              .map((subscriber, index) => (
                                  <TableRow key={index}>
                                      <TableCell align="center">
                                          {subscriber.storage_name}
                                      </TableCell>
                                      <TableCell align="center">
                                          <Grid
                                              container
                                              justifyContent="center"
                                          >
                                              <Grid
                                                  item
                                                  maxWidth="50"
                                                  align="center"
                                              >
                                                  <ButtonProduct
                                                      variant="contained"
                                                      color="primary"
                                                      size="small"
                                                      onClick={() => {}}
                                                  >
                                                      Chỉnh sửa
                                                  </ButtonProduct>
                                              </Grid>
                                          </Grid>
                                      </TableCell>
                                  </TableRow>
                              ))}
                </TableBody>
            </StyledTable>
            <Stack justifyContent="center" alignItems="center" mt={3}>
                <TablePagination
                    title="a"
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
            </Stack>
        </Box>
    );
};

export default ColorStorageTable;
