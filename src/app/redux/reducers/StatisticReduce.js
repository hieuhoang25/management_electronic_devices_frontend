import {
    STATISTIC_SPECICALLY,
    STATISTIC_PRODUCT_SELLING_TOP
} from '../actions/StatisticAction';

const initalState = {
    statisticSpecially: {},
    topSelling:[]
};

const StatisticReduce = (state = initalState, action) => {
    switch (action.type) {
        case STATISTIC_SPECICALLY:
            console.log(state)
            return {
                ...state,
                statisticSpecially: action.payload
            };
        case STATISTIC_PRODUCT_SELLING_TOP:
            console.log(state)
            return {
                    ...state,
                    topSelling: action.payload
                };
        default:
            return state;
    }
};
export default StatisticReduce;