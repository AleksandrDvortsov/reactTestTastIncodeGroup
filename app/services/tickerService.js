import io from 'socket.io-client';

let socket = null;

export const connectService = (stockSymbol, setParam, time) => {
    if (!time) {
        socket = io('http://localhost:4000');
        console.log(socket)
        socket.on('connect', () => {
            console.log('connected');

            socket.on(stockSymbol, (data) => {
                setParam(JSON.parse(data));
            });

            socket.emit('ticker', stockSymbol);
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }else {
        socket.disconnect();
    }

};
