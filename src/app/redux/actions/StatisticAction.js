import axios from 'axios.js';

export const STATISTIC_SPECICALLY = 'statisticSpecially';
export const STATISTIC_REVENUEBYWEEK = 'statisticRevenueByWeek';
export const STATISTIC_PRODUCT_SELLING_TOP = 'statisticProductSellingTop';

export const getStatisticSpecially = () => (dispatch) => {
    axios
        .get(process.env.REACT_APP_BASE_URL + 'statistic/statistic-pecially')
        .then((res) => {
            dispatch({
                type: STATISTIC_SPECICALLY,
                payload: res.data,
            });
        });
};

export const statisticProductSellingTop = () => (dispatch) => {
    axios
        .get(process.env.REACT_APP_BASE_URL + 'statistic/selling-top')
        .then((res) => {
            dispatch({
                type: STATISTIC_PRODUCT_SELLING_TOP,
                payload: res.data,
            });
        });
};
export const getStatisticRevenueByWeek = () => (dispatch) => {
    axios
        .get(process.env.REACT_APP_BASE_URL + 'statistic/revenuebyweek')
        .then((res) => {
            dispatch({
                type: STATISTIC_REVENUEBYWEEK,
                payload: res.data,
            });
        });
};
