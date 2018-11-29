require('dotenv').config();
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");

exports.generateToken = function(user) {
    var user_token={
        user:user
    }
    return token = jwt.sign(user_token, process.env.JWT_SECRET, {
        expiresIn: 60*3 // expires in 1 week
    });
}
//expiresIn: 60 * 60 * 24 * 7
// exports.verifyToken = function(token){
//     return jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//         return user;
//     });
// }

//tao chuoi Refreshtoken va ma hoa md5
exports.createRefreshToken=function(us){
  var str=randomstring.generate({
    length: 30,
      charset: 'alphabetic'
  });
  return str+us;
}
//kiem tra token het han
exports.checkExpiredToken = function(exp){
    var dateNow = new Date();
    if(exp < dateNow.getTime()/1000)
    {
      return false;
    }else{
      return true;
    }
}
//kiem tra token cua user co hop le ko
exports.checkAccessToken = function(req,res,next){
    var token=req.body.access_token;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
            if(err){
                if(err.message==='jwt expired')
                {
                  res.json({
                    msg:'token expired'
                  });
                }else{
                    res.statusCode=403;
                    res.json({
                    msg:'INVALID TOKEN',
                    error:err
                  });
                }
          }else{
              console.log(user);
              req.user_token=user;
              next();
          }
      });
    }else
    {
        res.statusCode=403;
        res.json({
            msg:'NO TOKEN FOUND!'
        });
    }
}

