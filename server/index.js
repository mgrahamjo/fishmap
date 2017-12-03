const WebSocket = require('ws'),
    query = require('./query');

const wss = new WebSocket.Server({port: 8888});

wss.on('connection', ws => {

    let timeout;

    function close() {

        console.log('Closing connection.');

        clearTimeout(timeout);

        ws.terminate();

        ws = null;

    }

    function startTimer() {

        clearTimeout(timeout);

        timeout = setTimeout(close, 30000);

    }

    function send(payload, type = 'log') {

        if (!ws) {

            return;

        }

        ws.send(JSON.stringify({
            payload,
            type
        }));

    }

    function handleError(err) {

        send(err.toString(), 'error');

        close();

    }

    ws.on('message', message => {

        startTimer();

        try {

            message = JSON.parse(message);

        } catch (err) {

            console.error(err);

            handleError(err);

            return;

        }

        if (message.type !== 'ping') {

            query(message, send, handleError);

        }

    });

    ws.on('close', close);

});

console.log('listening on port 8888');
