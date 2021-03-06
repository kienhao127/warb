// require('dotenv').config();
// var jwt = require('jsonwebtoken');
// var randomstring = require("randomstring");
// var socket=require('../app.js');
// var userRepo = require('../repos/UserRepos.js');
var rad = function(x) {
  return x * Math.PI / 180;
};

exports.getDistance = function(p1, p2) {
  var R = 6378137; //Haversine Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
// exports.generateToken = function(user) {
//     var user_token={
//         user:user
//     }
//     return token = jwt.sign(user_token, process.env.JWT_SECRET, {
//         expiresIn: 60*5 // expires in 1 week
//     });
// }

// //tao chuoi Refreshtoken va ma hoa md5
// exports.createRefreshToken=function(us){
//   var str=randomstring.generate({
//     length: 30,
//     charset: 'alphabetic'
// });
//   return str+us;
// }

// var generateTokens = function(user) {
//     var user_token={
//         user:user
//     }
//     return token = jwt.sign(user_token, process.env.JWT_SECRET, {
//         expiresIn: 60*5 // expires in 1 week
//     });
// }
// var createNewToken=function(ref_token,req,res,next){
//     userRepo.getRefreshTokenByToken(ref_token)
//     .then(rows => {
//       if(rows.length>0)
//       {
//         userRepo.loadOne(rows[0].id_user)
//         .then(result=>{
//             var acToken = generateTokens(result[0]);
//             socket.guidata(acToken,rows[0].id_user);
//             var user_token={
//               user:result[0]
//             }
//             console.log(result);
//             req.user_token=user_token;
//             next();
//         })
//         .catch(err=>{console.log("không lấy dc loadOne staff by id "+err)});
//       }else{
//         res.json({
//             returnCode:0,
//             msg:'token expired & refresh token not found'
//         });
//       }
//     })
//     .catch(err => {
//       console.log("không lấy dc getRefreshTokenByToken "+err);
//     })
// }
// //kiem tra token cua user co hop le ko
// exports.checkAccessToken = function(req,res,next){
//     var token=req.body.access_token;
//     var ref_token=req.body.refresh_token.toString();
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//             if(err){
//                 if(err.message==='jwt expired')
//                 {
//                   console.log(ref_token);
//                   createNewToken(ref_token,req,res,next);
//                 }else{
//                   res.statusCode=403;
//                   res.json({
//                     returnCode:0,
//                     message:'INVALID TOKEN',
//                     error:err
//                   });
//                 }
//             }else{
//                 console.log(user);
//                 req.user_token=user;
//                 next();
//             }
//         });
//     }else
//     {
//         res.statusCode=403;
//         res.json({
//             returnCode:0,
//             message:'NO TOKEN FOUND!'
//         });
//     }
// }

