import {
    STATISTIC_SPECICALLY
} from '../actions/StatisticAction';

const initalState = {
    statisticSpecially: {},
};

const StatisticReduce = (state = initalState, action) => {
    switch (action.type) {
        case STATISTIC_SPECICALLY:
            console.log(state)
            return {
                ...state,
                statisticSpecially: action.payload
            };
        
        default:
            return state;
    }
};
export default StatisticReduce;