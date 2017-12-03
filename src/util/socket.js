const socket = new WebSocket('ws://localhost:8888');
import app from 'app';

let queue = [];

socket.addEventListener('message', e => {

    const data = JSON.parse(e.data);

    switch (data.type) {

    case 'geo':
        app.updateGeo(data.payload);
        break;

    case 'error':
        alert(data.payload);
        break;

    }

});

socket.addEventListener('open', () => {

    queue.forEach(fn => fn());

    queue = [];

});

setInterval(() => send({type: 'ping'}), 25000);

const send = message => socket.send(JSON.stringify(message));

export default message => {

    if (socket.readyState === 1) {

        send(message);

    } else {

        queue.push(() => send(message));

    }

};
