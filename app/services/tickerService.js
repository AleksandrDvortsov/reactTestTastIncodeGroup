import io from 'socket.io-client';

let socket = null;

export const connectService = (stockSymbol, setParam, vivbleForm, time) => {
    if (!vivbleForm) {
        connectToserver('ticker', stockSymbol, true, setParam);
    } else {
        if (time !== null) {
            connectToserver('setTime', time, false, null);
        } else {
            socket.disconnect();
        }
    }
};

function connectToserver(emit, value, isStockSymbol, setParam) {
    socket = io('http://localhost:4000');
    socket.on('connect', () => {
        console.log('connected');
        if (isStockSymbol) {
            socket.on(value, (data) => {
                setParam(JSON.parse(data));
            });
        }
        socket.emit(emit, value);
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
}
