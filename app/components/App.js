import './style.scss';
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

    const [time, setTime] = useState(false);
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        connectService('AAPL', setTicker, time);
    }, [time])

    useEffect(() => {
        if (ticker.price !== undefined) {
            if (price === 0) {
                setPrice(ticker.price)
                return;
            }

            if(price > ticker.price)setColor('red')
            else setColor('green');
            setPrice(ticker.price);

        }
        console.log(price, ticker.price, 228);

    }, [ticker])

    function setTimeServer() {
        setTime(true);
        // появление меню
        // изминение времени тут
    }

    function formClose() {
        setTime(false);
        // закрытие меню  
    }

    function Form() {
        return (
            <div className='form'>
                <div>
                    <button onClick={setTimeServer}></button>
                </div>
                <p id='ticker'>Ticker: {ticker.ticker}</p>
                <p id='exchange'>Exchange: {ticker.exchange}</p>
                {color === 'red' ? <p id='price1'>Price: {ticker.price}$</p> : <p id='price2'>Price: {ticker.price}$</p>}
                {/* <p id='price'>Price: {ticker.price}$</p> */}
                <p id='change'>Change: {ticker.change}</p>
                <p id='change_percent'>Change percent: {ticker.change_percent}</p>
                <p id='last_trade_time'>Last trade time: {new Date(Date.parse(ticker.last_trade_time)).toLocaleString()}</p>
                <p id='dividend'>Dividend: {ticker.dividend}</p>
                <p id='yield'>Yield: {ticker.yield}</p>
            </div>
        );
    }

    function BlockTime() {
        return (
            <div className='blockTime'>
                <div>
                    <button id='btnClose' onClick={formClose}></button>
                </div>
            </div>
        );
    }

    return (
        <div className="stock-ticker">
            <h1>Stock Blotter 2</h1>
            <div className='conteinerForm'>
                {ticker.ticker !== undefined ? <Form /> : null}
                {time ? <BlockTime /> : null}
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
