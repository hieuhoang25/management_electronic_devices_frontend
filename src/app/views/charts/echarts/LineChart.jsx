import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import { useEffect } from 'react';
import { getStatisticRevenueByWeek } from 'app/redux/actions/StatisticAction';
import { useDispatch, useSelector } from 'react-redux';

const LineChart = ({ height, color = [] }) => {
    const theme = useTheme();
    const statistic = useSelector((state) => state.statistic);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStatisticRevenueByWeek());
        // eslint-disable-next-line
    }, []);
    var option = {};
    if (Object.keys(statistic.revenue).length !== 0) {
        option = {
            grid: { top: '10%', bottom: '10%', left: '10%', right: '5%' },
            legend: {
                itemGap: 20,
                icon: 'circle',
                textStyle: {
                    color: theme.palette.text.secondary,
                    fontSize: 13,
                    fontFamily: 'roboto',
                },
            },
            xAxis: {
                type: 'category',
                data: [
                    'Thứ 2',
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật',
                ],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    fontSize: 14,
                    fontFamily: 'roboto',
                    color: theme.palette.text.secondary,
                },
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        color: theme.palette.text.secondary,
                        opacity: 0.15,
                    },
                },
                axisLabel: {
                    color: theme.palette.text.secondary,
                    fontSize: 13,
                    fontFamily: 'roboto',
                },
            },
            series: [
                {
                    data: [
                        statistic.revenue.this_month.Mon || 0,
                        statistic.revenue.this_month.Tue || 0,
                        statistic.revenue.this_month.Wed || 0,
                        statistic.revenue.this_month.Thu || 0,
                        statistic.revenue.this_month.Fri || 0,
                        statistic.revenue.this_month.Sat || 0,
                        statistic.revenue.this_month.Sun || 0,
                    ],
                    type: 'line',
                    stack: 'Tháng này',
                    name: 'Tháng này',
                    smooth: true,
                    symbolSize: 4,
                    lineStyle: { width: 4 },
                },
                {
                    data: [
                        statistic.revenue.last_month.Mon || 0,
                        statistic.revenue.last_month.Tue || 0,
                        statistic.revenue.last_month.Wed || 0,
                        statistic.revenue.last_month.Thu || 0,
                        statistic.revenue.last_month.Fri || 0,
                        statistic.revenue.last_month.Sat || 0,
                        statistic.revenue.last_month.Sun || 0,
                    ],
                    type: 'line',
                    stack: 'Tháng trước',
                    name: 'Tháng trước',
                    smooth: true,
                    symbolSize: 4,
                    lineStyle: { width: 4 },
                },
            ],
        };
    }

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{ ...option, color: [...color] }}
        />
    );
};

export default LineChart;
