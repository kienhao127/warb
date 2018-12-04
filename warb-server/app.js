
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// thiet lap router
app.use('/user', require('./router/UserRouter.js'));
app.use('/refreshToken', require('./router/TokenRouter.js'));
app.use('/map', require('./router/MapRouter.js'));


// run server
var num_port = 8888;
var port = process.env.port || num_port;
var server=app.listen(port, () =>{
    console.log("Link server: "+require("ip").address()+":" + port);
    console.log("Running server!!!");
})
app.get("/",(req,res)=>{
    res.end("WELCOM TO GRAB-SERVICE API!!");
})


//SOCKET

var arr=[];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    arr.push(socket);
    socket.re_status=[{key:0}];
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
        arr.splice(arr.indexOf(socket.id),1);

    });
    socket.on("gui_data",function(data){
        console.log(data);
    });
    socket.on("dang_ky_nhan_token",function(data){
        console.log(data);
        socket.user_id=data;
        socket.re_status.dang_ky_nhan_token=1;
    });

})
exports.guidata=(data,id)=>{
	console.log(data);
	console.log("id="+id);
	console.log("arr length ="+arr.length);

	arr.map(socket=>{
		if(socket.user_id === id && socket.re_status["dang_ky_nhan_token"] === 1)
		{
       	    socket.emit("token",data);
		}
	});
    }

