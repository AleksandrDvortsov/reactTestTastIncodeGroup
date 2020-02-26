const initialState = {
   ticker: {},
}

const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TICKER':
            return {
                ...state,
                ticker: action.ticker
            };

        default:
            return state;
    }
};

export default stockTicker;
