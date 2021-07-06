const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080', { forceNew: true })

console.log('manda msj');
socket.emit("keyValuePair", { key: 'key message', value: 'value message' });

socket.on('error', msg => {
    console.log('recibo error');
    console.error(msg)
})