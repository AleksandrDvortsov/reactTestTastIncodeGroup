const stockTicker = (state = {ticker: null}, action) => {
    switch (action.type) {
        case 'SET_TICKER':
            return {
                ...state,
                ticker: action.par
            };

        default:
            return state;
    }
};

export default stockTicker;
