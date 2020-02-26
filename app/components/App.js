import '../styles/application.scss';
import { connectService } from '../services';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// The below line is here as an example of getting prices
// connect('AAPL');

function App(props) {
    const {
        setTicker,
        ticker
    } = props;

    useEffect(() => {
        connectService('AAPL', setTicker);
    }, [])

    useEffect(() => {
        console.log(ticker.ticker, 123456789)
    }, [ticker])

    function setTime() {

    }
    
    function Form() {
        return(
            <div>
                <div>
                    <button onClick={setTime}>click</button>
                </div>
                <p>{ticker.ticker}</p>
                <p>{ticker.exchange}</p>
                <p>{ticker.price}</p>
                <p>{ticker.change}</p>
                <p>{ticker.change_percent}</p>
                <p>{ticker.last_trade_time}</p>
                <p>{ticker.dividend}</p>
                <p>{ticker.yield}</p>
            </div>
        );
    }

    return (
        <div className="stock-ticker">
            <h1>Stock Blotter 2</h1>
            <div>
                {ticker.ticker !== undefined ? <Form /> : null}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTicker: (ticker) => {
            dispatch({ type: 'SET_TICKER', ticker });
        }
    };
};

const mapStateToProps = state => {
    return {
        ticker: state.ticker,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
