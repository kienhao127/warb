var tripRepo = require('../repos/TripRepos.js');
var mapRepo = require('../repos/MapRepos.js');
require('dotenv').config();
var moment=require('moment');
var socket=require('../app.js');

exports.updateTripLocation = function(req,res) {
    var c=req.body;
    tripRepo.updateTripLocation(c)
    .then(rows=>{
        res.json({
            returnCode:1,
            message:"update TripLocation thanh công!",
        })
    })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"update TripLocation không thành công!",
            error:err
        });
    });
}
exports.getTripById=function(req,res){
    var c=req.body;
    tripRepo.getTripByTripId(c.tripId)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy trip thành công!",
            object:rows[0]
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
            object:rows
        })
       }
   })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip thất bại!",
            error:err
        });
    })
}
exports.getTripByStatus=function(req,res){
    var c=req.body;
    tripRepo.getTripByStatus(c)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
            object:rows
        })
       }
   })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip thất bại!",
            error:err
        });
    })
}
exports.getTripByDriverId=function(req,res){
    var c=req.body;
    tripRepo.getTripByDriverId(c.driverID)
    .then(rows=>{
        if(rows.length>0)
        {
           res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
       }else {
           res.json({
            returnCode:0,
            message:" khong co trip nao!",
            object:rows
        })
       }
   })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip thất bại!",
            error:err
        });
    })
}
exports.getAllTrip=function(req,res){
    tripRepo.loadTripFull2()
    .then(rows=>{
        rows.map(m=>{
            m.password="";
        })
        res.json({
            returnCode:1,
            message:" lấy danh sách trip thành công!",
            object:rows
        })
    })
    .catch(err=>{
        res.json({
            returnCode:0,
            message:"lấy danh sách trip thất bại!",
            error:err
        });
    });
}
exports.addCustomerAndTrip=function(req,res){
    var c=req.body;
    var users=req.user_token;
    tripRepo.addCustomer(c)
    .then(rows=>{
        console.log("them Customer thanh cong");
        console.log(rows.insertId);
        var customer={
            id:rows.insertId,
            customerName:c.customerName,
            customerPhone:c.customerPhone,
            customerAddress:c.customerAddress,
            isDelete:c.isDelete
        }
        var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${c.customerAddress}&key=${process.env.key}`;
        var url = encodeURI(stringUrl);
        mapRepo.getMapAPI(url)
        .then(body=>{
            let lat=body.results[0].geometry.location.lat;
            let lng=body.results[0].geometry.location.lng;
            let lo=lat+","+lng;
            //customerId,driverId,tripLocation,tripLongitude,tripLatitude,status,note,requestTime,isDelete
            var trip={
                customerId:rows.insertId,
                driverId:0,
                tripLocation:lo,
                tripLongitude:lng,
                tripLatitude:lat,
                status:1,
                note: req.body.note,
                requestTime:moment().format('x'),
                isDelete:0
            }
            //console.log(trip);
            tripRepo.addTrip(trip)
            .then(data=>{
                trip.id=data.insertId;
                tripRepo.getTripByTripId(trip.id)
                .then(values=>{
                    console.log("values");
                    console.log(values);
                    socket.guidataForType(values,"server_send_trip");
                    res.json({
                        returnCode:1,
                        message:"Thêm khách hàng & chuyến đi thành công!",
                        object:{
                            trip:trip,
                            customer:customer
                        }
                    });
                })
                .catch(er=>{
                   res.json({
                    returnCode:0,
                    message:"Thêm khách hàng & chuyến đi thất bại!",
                    error:er
                });
               });
                
            })
            .catch(err=>{
                console.log(err);
            });
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch(err=>{
     res.json({
        returnCode:0,
        message:"Thêm khách hàng & chuyến đi thất bại!",
        error:err
    });
 });
}
exports.updateTripStatus = function(req,res) {
    var trip = {
        id: req.body.tripId,
        status: req.body.tripStatus
    }
    console.log('updateTripStatus', trip);
    tripRepo.updateTripStatus(trip)
    .then(body => {
        var c = {
            // address:body.results[0].formatted_address,
            // lat:body.results[0].geometry.location.lat,
            // lng:body.results[0].geometry.location.lng
        }
        res.json({
            returnCode: 1,
            message: "update trip status success!",
            object: c
        });
    })
    .catch(err=>{
        res.json({
            returnCode: 0,
            message: "update trip status fail!",
            error: err
        });
    })
}