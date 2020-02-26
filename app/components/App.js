import '../styles/application.scss';
import { connectService } from '../services';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// The below line is here as an example of getting prices
// connect('AAPL');

function App(props) {
    const {
        setTicker,
    } = props;
    console.log(props);

    useEffect(()=>{
        connectService('AAPL', setTicker);
    }, [])


    return (
        <div className="stock-ticker">
            <h1>Stock Blotter 2</h1>

        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTicker: (par) => {
            dispatch({ type: 'SET_TICKER', par });
        }
    };
};

const mapStateToProps = state => {
    return {
        ticker: state.ticker,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
