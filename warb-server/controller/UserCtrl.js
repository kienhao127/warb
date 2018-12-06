var tokenCtrl=require('../controller/TokenCtrl.js');
var userRepo = require('../repos/UserRepos.js');
var tokenRepo = require('../repos/TokenRepos.js');
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
			message:"get staff error",
			error:err
		});
	})
};

exports.getUser = function(req,res) {
	var id_user=req.body.id;
	userRepo.loadOne(id_user)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get user susscess",
				user:rows[0]
			});
		}
	})
	.catch(err=>{
		res.json({
				returnCode:0,
				message:"get user error",
				error:err	
			});
	});
	//res.json(req.user_token);
};
exports.getUserByToken= function(req,res){
	var reToken=req.body.refresh_token;
	userRepo.getUserByRefreshToken(reToken)
        .then(rows=>{
            if(rows.length>0)
            {
                res.json({
				returnCode:1,
				message:"lấy danh user theo refresh token thành công !! ",
				object:rows
			   });
            }
        })
        .catch(error=>{
                res.json({
				returnCode:0,
				message:"lấy danh user theo refresh token thất bại !!",
				error:error	
			});
        });
}
exports.getUserForType = function(req,res) {
	var dif=req.body.dif;
	userRepo.loadForType(dif)
	.then(rows=>{
		if(rows.length>0)
		{
			res.statusCode = 201;
			res.json({
				returnCode:1,
				message:"get susscess",
				object:rows
			});
		}
	})
	.catch(err=>{
		res.json({
				returnCode:0,
				message:"get error",
				error:err	
			});
	});
	//res.json(req.user_token);
};
exports.login = function(req,res) {
	var c=req.body;

	userRepo.login(c)
	.then(rows => {
		if(rows.length>0)
		{
			tokenRepo.getRefreshToken(rows)
			.then(data=>{
				if(data.length>0){
					console.log(data);
					var acToken=tokenCtrl.generateToken(rows[0]);
                    
                    var user={
                    	userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:data[0].refresh_token
                    }
					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login susscess",
						user:user
					});
				}
				else
				{
					var acToken=tokenCtrl.generateToken(rows[0]);
					var rfToken=tokenCtrl.createRefreshToken(rows[0].username);
					var nd5_rfToken=md5(rfToken);
                    
                    var user1={
                    	userId:rows[0].id,
						username:rows[0].username,
						userType:rows[0].userType,
						access_token:acToken,
						refresh_token:nd5_rfToken.toString()
                    }
					res.statusCode = 201;
					res.json({
						returnCode:1,
			            message:"login susscess",
						user:user1
					});

					tokenRepo.addRefreshToken({
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
			    message:"username or password INVALID"
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json({
				returnCode:0,
			    message:"login error",
			    error:err
			});
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
			msg: 'register error',
			error:err
		});
	})
};

