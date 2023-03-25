import {
    Box,
    Card,
    Grid,
    Icon,
    IconButton,
    styled,
    Tooltip,
} from '@mui/material';
import { Small } from 'app/components/Typography';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { formatCurrency } from 'app/utils/utils';
import { getStatisticSpecially } from 'app/redux/actions/StatisticAction';
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));
const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: theme.palette.text.secondary },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}));

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
}));

const StatCards = (props) => {
    const { getStatisticSpecially, statistic } = props;

    useEffect(() => {
        getStatisticSpecially();
        // setProductList(products.listProduct.data);

        // eslint-disable-next-line
    }, []);

    const navigate = useNavigate();
    const cardList = [
        {
            name: 'Người dùng',
            amount: statistic.statisticSpecially.number_of_user,
            icon: 'group',
            url: '/account',
        },
        {
            name: 'Doanh thu ',
            amount: formatCurrency(statistic.statisticSpecially.week_envenue),
            icon: 'attach_money',
            url: '/dashboard/default',
        },
        {
            name: 'Tổng số lượng sản phẩm bán ra',
            amount: statistic.statisticSpecially.product_selled,
            icon: 'store',
            url: '/product',
        },
        {
            name: 'Đơn hàng đang chờ xác nhận',
            amount: statistic.statisticSpecially.order_yet_approved,
            icon: 'shopping_cart',
            url: '/order',
        },
    ];

    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            {cardList.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">{item.icon}</Icon>
                            <Box ml="12px">
                                <Small>{item.name}</Small>
                                <Heading>{item.amount}</Heading>
                            </Box>
                        </ContentBox>

                        <Tooltip title="View Details" placement="top">
                            <IconButton onClick={() => navigate(item.url)}>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};
const mapStateToProps = (state) => ({
    getStatisticSpecially: PropTypes.func.isRequired,

    statistic: state.statistic,
});
export default connect(mapStateToProps, { getStatisticSpecially })(StatCards);
