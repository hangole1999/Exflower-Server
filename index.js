
var http = require('http');
var socketio = require('socket.io');
var express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router')(app, io);
const PORT = 3000;

app.use(express.static('public'));



server.listen(PORT, function () {
	console.log("Exflower Server has started\nServer Running at http://localhost:" + PORT);
});
