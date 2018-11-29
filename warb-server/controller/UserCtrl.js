var token=require('../utils/Utils.js');
var userRepo = require('../repos/UserRepos.js');
var md5=require('crypto-js/md5');
// lay danh sach user
exports.showAll = function(req,res) {
	userRepo.loadAll()
	.then(rows => {
		res.statusCode = 201;
		res.json({
			returnCode:1,
			message:"get staff susscess",
			object:rows
		});
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json({
			returnCode:0,
			message:"get staff error"
		});
	})
};

exports.getUser = function(req,res) {
	res.json(req.user_token);
};

exports.login = function(req,res) {
	var c=req.body;

	userRepo.login(c)
	.then(rows => {
		if(rows.length>0)
		{
			userRepo.getRefreshToken(rows)
			.then(data=>{
				if(data.length>0){
					console.log(data);
					var acToken=token.generateToken(rows[0]);
					var rfToken=token.createRefreshToken(rows[0].username);

					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login susscess",
						userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:data[0].refresh_token
					});
				}
				else
				{
					var acToken=token.generateToken(rows[0]);
					var rfToken=token.createRefreshToken(rows[0].username);
					var nd5_rfToken=md5(rfToken);

					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login susscess",
						userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:nd5_rfToken.toString()
					});

					userRepo.addRefreshToken({
						id_user:rows[0].id,
						refresh_token:nd5_rfToken,
						isFrist:1
					})
					.then(result=>{
						console.log("add refresh token success")
					})
					.catch(err=>console.log(err))
				}
			})
			.catch(err=>console.log(err))
		}else{
			res.statusCode = 201;
			res.json({
				returnCode:0,
			    message:"login error"
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on server console');
	})
};


exports.register = function(req,res) {
	var c=req.body;
	userRepo.add(c)
	.then(rows => {
		res.statusCode = 201;
		res.json({
			returnCode:1,
			msg: 'register success'
		});
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json({
			returnCode:0,
			msg: 'register error'
		});
	})
};