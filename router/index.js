
module.exports = function (app, io) {

	const serverData = {
		rooms: [],
		roomMap: []
	}

	serverData.rooms['default'] = {
		name: 'default',
		people: []
	};

	const expressRouter = require('./express')(app);
	const socketioRouter = require('./socketio')(io, serverData);

};
