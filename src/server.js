require('dotenv').config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routes = require('./routes');
const socketManager = require('./ws/socketManager').socketManager;

io.on('connection', socketManager);

app.use(process.env.API_PREFIX + '/keyValuePair', routes.keyValuePair);
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});