var http = require('http');
var socketio = require('socket.io');
var express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router')(app, io);
const PORT = 3000;

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.engine('html', require('ejs').renderFile);



server.listen(PORT, function () {
	console.log("Exflower Server has started\nServer Running at http://localhost:" + PORT);
});