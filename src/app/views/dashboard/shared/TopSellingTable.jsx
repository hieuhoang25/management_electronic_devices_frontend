import {
    Avatar,
    Box,
    Card,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'app/utils/utils';
import { Paragraph } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { statisticProductSellingTop } from 'app/redux/actions/StatisticAction';
import { connect } from 'react-redux';
const CardHeader = styled(Box)(() => ({
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        width: 50,
        height: 15,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': { borderBottom: 'none' },
    '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = (props) => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const bgError = palette.error.main;
    const bgPrimary = palette.primary.main;
    const bgSecondary = palette.secondary.main;
    // const [data, setData] = useState(null);
    const { statisticProductSellingTop, statistic } = props;

    useEffect(() => {
        statisticProductSellingTop();
        // setProductList(products.listProduct.data);

        // eslint-disable-next-line
    }, []);
    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Top sản phẩm bán chạy</Title>
            </CardHeader>

            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Tên
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Doanh thu
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Tồn kho
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Chỉnh sửa
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {statistic.topSelling.map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar
                                            src={
                                                process.env
                                                    .REACT_APP_BASE_URL_FIREBASE +
                                                product.image +
                                                '?alt=media&token=' +
                                                uuidv4()
                                            }
                                        />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.product_name}
                                        </Paragraph>
                                    </Box>
                                </TableCell>

                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    {formatCurrency(product.revenue)}
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.stock ? (
                                        product.stock < 20 ? (
                                            <Small bgcolor={bgSecondary}>
                                                {product.stock} còn hàng
                                            </Small>
                                        ) : (
                                            <Small bgcolor={bgPrimary}>
                                                còn hàng
                                            </Small>
                                        )
                                    ) : (
                                        <Small bgcolor={bgError}>
                                            hết hàng
                                        </Small>
                                    )}
                                </TableCell>

                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    <IconButton
                                        onClick={() => navigate('/product')}
                                    >
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    getStatisticSpecially: PropTypes.func.isRequired,

    statistic: state.statistic,
});
export default connect(mapStateToProps, { statisticProductSellingTop })(
    TopSellingTable,
);
