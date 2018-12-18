
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var token=require('./repos/UserRepos.js');
var driver=require('./controller/DriverCtrl.js');

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
var arrRequest=[];
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    socket.user={id:0};
    socket.location={};
    arr.push(socket);
    socket.driver_status=1;
    console.log('==========================================================================');
    console.log('*************=a user connected id= '+socket.id);

    socket.on('disconnect', function(){

        console.log('*************=a user disconnected id= '+socket.id);
        arr.splice(arr.indexOf(socket.id),1);
        arrDriver.splice(arrDriver.indexOf(socket.id),1);

    });
    socket.on("location_driver",function(data){
        if(socket.user.userType===4){
            socket.location=data;
        }
    });
    socket.on("request-client",function(data){
        arrRequest.push(data);
        driver.sendRequestForDriver(socket,data,arrDriver,arrRequest);
    });
    // socket.on("accept_request",function(data){
    //     arrRequest.splice(arrRequest.indexOf(data),1);
    // });
    socket.on("send_refresh_token",function(data){
        console.log("nhan duoc send_refresh_token "+data);
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
                }
            })
            .catch(error=>{
                console.log(error);
            });
        }   
    });

})
app.get("/haha",(req,res)=>{
     var user=[];
    if(arr.length>0)
    {
        arr.map(e=>{
           user.push({
            socket:e.id,
            userid:e.user.id,
            username:e.user.username,
            Type:e.user.userType
           }); 
        })
    }
    res.json({
        socket:user
    });

    // var user=[];
    // if(arrDriver.length>0)
    // {
    //     arrDriver.map(e=>{
    //        user.push({
    //         user:e.user,
    //         location:e.location
    //        }); 
    //     })
    // }
    // res.json({
    //     arrDriver:arrDriver.length,
    //     socket:user
    // });
})
var guidata=(data,id,title)=>{
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
var guidataForType=(data,id,title,Type)=>{
   console.log(data);
   io.sockets.emit(title,data);
}
module.exports.arrDriver=arrDriver;
module.exports.guidata=guidata;
module.exports.guidataForType=guidataForType;
module.exports.arrRequest=arrRequest

