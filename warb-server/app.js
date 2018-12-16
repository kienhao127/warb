
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var token=require('./repos/UserRepos.js');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// thiet lap router
app.use('/user', require('./router/UserRouter.js'));
app.use('/refreshToken', require('./router/TokenRouter.js'));
app.use('/map', require('./router/MapRouter.js'));
app.use('/trip', require('./router/TripRouter.js'));


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
var arrDriver=[];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    socket.user={id:0};
    arr.push(socket);
    socket.re_status=[{key:0}];
    console.log('a user connected id= '+socket.id);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        arr.splice(arr.indexOf(socket.id),1);

    });
    socket.on("gui_data",function(data){
        console.log(data);
    });
    socket.on("send_refresh_token",function(data){
        console.log(data);
        if(data===null || data.length===0)
        {
               console.log("không nhan dc send_refresh_token tu client");
        }else {
            token.getUserByRefreshToken(data)
            .then(rows=>{
                if(rows.length>0)
                {
                    socket.user=rows[0];
                    if(socket.user.userType===4)
                    {
                        arrDriver.push(socket);
                    }
                    //console.log(rows[0]);
                    socket.re_status.dang_ky_nhan_token=1;
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }   
    });

})
exports.guidata=(data,id,title)=>{
	 console.log(data);
	// console.log("id="+id);
	// console.log("arr length ="+arr.length);

	arr.map(socket=>{
		if(socket.user.id === id)
		{
       	    socket.emit(title,data);
		}
	});
    }

