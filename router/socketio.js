
module.exports = function (io, serverData) {
    
	io.on('connection', function(socket) {

        console.log('\nconnection : ' + socket.id);
        
        socket.on('getrooms', function () {

            var rooms = Object.assign({}, serverData.rooms);

            for (var i in rooms) {
                rooms[i].people = Object.assign({}, rooms[i].people);
            }

            socket.emit('getrooms', rooms);

        });
        
        socket.on('create', function (data) {

            if (!data.room || !data.nickname) {
                console.error("\ncreate failed : " + socket.id);
                return;
            }

            console.log("\ncreate : " + socket.id);
            console.log(data);
            
            serverData.roomMap[socket.id] = data.room;

            serverData.rooms[serverData.roomMap[socket.id]] = {
                name: serverData.roomMap[socket.id],
                people: []
            };
            
            socket.join(serverData.roomMap[socket.id]);

            serverData.rooms[serverData.roomMap[socket.id]].people[socket.id] = data;
            serverData.rooms[serverData.roomMap[socket.id]].people[socket.id].id = socket.id;

            io.to(serverData.roomMap[socket.id]).emit('join', data);

        });
        
        socket.on('join', function (data) {

            if (!data.room || !data.nickname) {
                console.error("\njoin failed : " + socket.id);
                return;
            }

            console.log("\njoin : " + socket.id);
            console.log(data);
            
            serverData.roomMap[socket.id] = data.room;
            
            socket.join(serverData.roomMap[socket.id]);

            serverData.rooms[serverData.roomMap[socket.id]].people[socket.id] = data;
            serverData.rooms[serverData.roomMap[socket.id]].people[socket.id].id = socket.id;

            io.to(serverData.roomMap[socket.id]).emit('join', data);

        });
        
        socket.on('message', function (data) {

            if (!data.message) {
                console.error("\nmessage failed : " + socket.id);
                return;
            }

            console.log("\nmessage : " + socket.id);
            console.log(data);

            data.nickname = serverData.rooms[serverData.roomMap[socket.id]].people[socket.id].nickname;
            data.date = Date.now();
            data.id = socket.id;

            io.to(serverData.roomMap[socket.id]).emit('message', data);

        });

        socket.on('leave', function(e) {

            console.error('\nleave : ' + socket.id);

            socket.leave(serverData.roomMap[socket.id]);

            io.to(serverData.roomMap[socket.id]).emit('leave', serverData.rooms[serverData.roomMap[socket.id]].people[socket.id]);

            delete serverData.rooms[serverData.roomMap[socket.id]].people[socket.id];
            delete serverData.roomMap[socket.id];

        });
        
        socket.on('disconnect', function(e) {

            console.error('\ndisconnect : ' + socket.id);

            if (serverData.rooms[serverData.roomMap[socket.id]]) {
                io.to(serverData.roomMap[socket.id]).emit('leave', serverData.rooms[serverData.roomMap[socket.id]].people[socket.id]);
                delete serverData.rooms[serverData.roomMap[socket.id]].people[socket.id];
            }

            delete serverData.roomMap[socket.id];

        });
        
    });
    
};
