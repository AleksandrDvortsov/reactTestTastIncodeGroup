import './style.scss';
import { connectService } from '../services';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

// The below line is here as an example of getting prices
// connect('AAPL');
const name = 'AAPL';

function App(props) {
    const {
        setTicker,
        ticker
    } = props;

    const [vivbleForm, setvivbleForm] = useState(false);
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const inputEl = useRef(null);

    useEffect(() => {
        connectService(name, setTicker, vivbleForm, null);
    }, [vivbleForm])

    useEffect(() => {
        if (ticker.price !== undefined) {
            if (price === 0) {
                setPrice(ticker.price)
                return;
            }
            if (price > ticker.price) setColor('red')
            else setColor('green');
            setPrice(ticker.price);
        }
    }, [ticker])

    function formOpen() {
        setvivbleForm(true);
    }

    function formClose() {
        setvivbleForm(false);
    }

    function setTimeServer() {
        if(inputEl.current.valueAsNumber < inputEl.current.min || inputEl.current.valueAsNumber > inputEl.current.max || isNaN(inputEl.current.valueAsNumber)){
            alert(`value should be within ${inputEl.current.min} - ${inputEl.current.max}`)
        }else {
            connectService(name, setTicker, vivbleForm, inputEl.current.valueAsNumber);
        }
        
    }

    function Form() {
        return (
            <div className='form'>
                <div>
                    <button onClick={formOpen}></button>
                </div>
                <p id='ticker'>Ticker: {ticker.ticker}</p>
                <p id='exchange'>Exchange: {ticker.exchange}</p>
                {color === 'red' ? <p id='price1'>Price: {ticker.price}$ ↓</p> : <p id='price2'>Price: {ticker.price}$ ↑</p>}
                <p id='change'>Change: {ticker.change}</p>
                <p id='change_percent'>Change percent: {ticker.change_percent}%</p>
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
                <div className="form__group field">
                    <input type="number" min="500" max="10000" step='100' className="form__field" placeholder="Name" name="name" id='name' autoComplete='off' ref={inputEl} />
                    <label className="form__label">Time in milliseconds (500 - 10000)</label>
                </div>
                <div>
                    <button id='btnSetTimeServer' onClick={setTimeServer}>set Time</button>
                </div>
            </div>
        );
    }

    return (
        <div className="stock-ticker">
            <div className='conteinerForm'>
                {ticker.ticker !== undefined ? <Form /> : null}
                {vivbleForm ? <BlockTime /> : null}
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
