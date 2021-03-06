
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var userRepos=require('./repos/UserRepos.js');
var driver=require('./controller/DriverCtrl.js');
var tripRepos=require('./repos/TripRepos.js');
const path = require('path');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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
    
    socket.driver_status=0;
    socket.premission=true;
    console.log('==========================================================================');

    socket.on('disconnect', function(){
        console.log('==========================================================================');
        console.log("$$$$$$$$$$$$$$$ USER : [ "+socket.user.username +"("+socket.id+")"+" ] VUA OFFlINE");
        console.log('==========================================================================');
        if(socket.user.userType===4)
        {
            if(socket.driver_status!=2){
               userRepos.updateStausDriver(socket.user.id,3).then(data=>{}).catch(err=>{console.log(err)});
            }     
        }
        if(socket.user.id!=0){
            arr.splice(arr.indexOf(socket.id),1);
            arrDriver.splice(arrDriver.indexOf(socket.id),1);
        }
        
    });
    socket.on("location_driver",function(data){
        if(socket.user.userType===4){
            socket.location=data;
        }
    });
    socket.on("driver_online",function(data){
        if(socket.user.userType===4){

            driver.driverOnline(socket,data,arrDriver);
        }
    });
    socket.on("driver_offline",function(data){
        if(socket.user.userType===4){
            driver.driverOffline(socket,data,arrDriver);
        }
    });
    socket.on("begin_trip",function(data){
        if(socket.user.userType===4){
            driver.beginTrip(socket,data);
        }
    });
    socket.on("end_trip",function(data){
        if(socket.user.userType===4){
            driver.endTrip(socket,data,arrDriver);
        }
    });
    socket.on("done_locationer",function(data){
            driver.updateDoneLocation(data,socket);
    });
    socket.on("request-client",function(data){
        arrRequest.push(data);
        console.log(data);
        if(data.status===2){
            driver.sendRequestForDriver(socket,data,arrDriver);
        }else {
            console.log("chuyen dy nay da hoan tat roi !!");
        }  
    });
    socket.on("get_Driver_By_Id",function(data){
        userRepos.getDriverById(data)
                        .then(result=>{
                           socket.emit("get_status_driver",result[0]);
                        })
                        .catch(err=>console.log(err))
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
            userRepos.getUserByRefreshToken(data)
            .then(rows=>{
                if(rows.length>0)
                {
                    arr.push(socket);
                    console.log(rows)
                    socket.user=rows[0];
                    
                    console.log('==========================================================================');
                    console.log("$$$$$$$$$$$$$$$ USER : [ "+socket.user.username+"("+socket.id+")"+" ] VUA ONLINE");
                    console.log('==========================================================================');
                    if(socket.user.userType===4)
                    {
                        
                        arrDriver.push(socket);
                        userRepos.getDriverByRefreshToken(data)

                        .then(result=>{
                            console.log(result[0])
                            if(result[0].status===2){
                               socket.driver_status=2;
                            }else {
                                socket.driver_status=1;
                                userRepos.updateStausDriver(rows[0].id,1).then(data=>{
                                    socket.emit("done_update","true");
                                }).catch(err=>{console.log(err)});
                            }
                        })
                        .catch(err=>console.log(err))
                       
                        
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
    //  var user=[];
    // if(arr.length>0)
    // {
    //     arr.map(e=>{
    //        user.push({
    //         socket:e.id,
    //         userid:e.user.id,
    //         username:e.user.username,
    //         Type:e.user.userType
    //        }); 
    //     })
    // }
    // res.json({
    //     socket:user
    // });

    var user=[];
    if(arrDriver.length>0)
    {
        arrDriver.map(e=>{
           user.push({
            user:e.user,
            location:e.location
           }); 
        })
    }
    res.json({
        arrDriver:arrDriver.length,
        socket:user
    });
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
var guidataForType=(data,title)=>{
   io.sockets.emit(title,data[0]);
}

var sendUpdate=(data,title)=>{
  console.log(data);
  tripRepos.getTripByTripId(data)
  .then(rows=>{
     console.log(rows[0]);
    io.sockets.emit(title,rows[0]);
  })
  .catch(err=>{
    console.log(err);
  })
}
var sendDriverUpdate=(data,title)=>{
  console.log(data);
  tripRepos.getDriverById2(data)
  .then(rows=>{
     console.log(rows[0]);
    io.sockets.emit(title,rows[0]);
  })
  .catch(err=>{
    console.log(err);
  })
}
module.exports.arrDriver=arrDriver;
module.exports.sendUpdate=sendUpdate;
module.exports.sendDriverUpdate=sendDriverUpdate;
module.exports.guidata=guidata;
module.exports.guidataForType=guidataForType;
module.exports.arrRequest=arrRequest

