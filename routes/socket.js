module.exports = function(app, io) {
    var users = [],
        existingContent;
    io.on('connection', function(socket) {

        socket.on("addUser", function(data) {
            users.push(data);
            socket.name = data.name;
            io.emit('userAdded', { joined: data.name, allUsers: users });
        });

        socket.emit("addExistingContent", { data: existingContent, allUsers: users });

        socket.on("triggerChange", function(data) {
            existingContent = data.inputvalue;
            socket.broadcast.emit('changedValue', { data: data.inputvalue});
        });

        socket.on('disconnect', function() {
            for (var i = 0; i < users.length; i++) {
            	if(users[i].name == socket.name) {
            		users.splice(i, 1);
            	}
            }
            console.log(users);
            socket.broadcast.emit('userLeft', { left: socket.name, allUsers: users });
        });
    });
};
