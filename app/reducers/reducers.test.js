import stockTicker from './index';

import React from 'react';

it('Set ticker to store', () => {
    // data
    const state = {
        ticker: {},
    }
    const newState = {
        ticker: "AAPL",
        exchange: "NASDAQ",
        price: "113.83",
        change: "179.37",
        change_percent: "0.67",
        last_trade_time: "2020-02-27T10:48:01.000Z",
        dividend: "0.61",
        yield: "1.97"
    }
    // action
    let newStore = stockTicker(state, { type: 'SET_TICKER', ticker: newState });
    // exept
    expect(newState.ticker).toBe(newState);
})
it('Update ticker to store', () => {
    // data
    const state = {
        ticker: {
            ticker: "AAPL",
            exchange: "NASDAQ",
            price: "113.83",
            change: "179.37",
            change_percent: "0.67",
            last_trade_time: "2020-02-27T10:48:01.000Z",
            dividend: "0.61",
            yield: "1.97"
        },
    }
    const newState = {
        ticker: "AAPL",
        exchange: "NASDAQ",
        price: "299.24",
        change: "152.15",
        change_percent: "0.95",
        last_trade_time: "2020-02-27T10:48:06.000Z",
        dividend: "0.38",
        yield: "1.41"
    }
    // action
    let newStore = stockTicker(state, { type: 'SET_TICKER', ticker: newState });
    // exept
    expect(newState.ticker).toBe(newState);
})