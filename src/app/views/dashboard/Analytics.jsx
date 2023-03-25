import { Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import StatCards from './shared/StatCards';
import TopSellingTable from './shared/TopSellingTable';
import LineChart from '../charts/echarts/LineChart';
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '.5rem',
    textTransform: 'capitalize',
}));

// const SubTitle = styled('span')(({ theme }) => ({
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary,
// }));

// const H4 = styled('h4')(({ theme }) => ({
//     fontSize: '1rem',
//     fontWeight: '500',
//     marginBottom: '16px',
//     textTransform: 'capitalize',
//     color: theme.palette.text.secondary,
// }));

const Analytics = () => {
    const { palette } = useTheme();

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <StatCards />
                        <TopSellingTable />

                        <Title>Doanh thu tháng</Title>
                        <LineChart
                            height="350px"
                            color={[
                                palette.primary.dark,
                                palette.primary.light,
                            ]}
                        />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default Analytics;
