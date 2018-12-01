var server=require('./app.js');
var socketClient;

var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	socketClient=socket;
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socketClient.on("gui_data",function(data){
        console.log(data);
    });

})
exports.guidata=(data)=>{
	console.log(data);
    	socketClient.emit("token",data);
    }