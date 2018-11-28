
var express = require('express')
var app = express();
var http=require("http");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var server=http.Server(app);
var io=require("socket.io")(server);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// thiet lap router
app.use('/user', require('./router/UserRouter.js'));
app.use(bodyParser.urlencoded({extended: true}));


// run server
var num_port = 8888;
var port = process.env.port || num_port;
app.listen(port, () =>{
    console.log("Link server: "+require("ip").address()+":" + port);
    console.log("Running server!!!");
})
app.get("/",(req,res)=>{
    res.end("WELCOM TO GRAB-SERVICE API!!");
})
