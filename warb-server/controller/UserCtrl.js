
var userRepo = require('../repos/UserRepos.js');

// lay danh sach user
exports.showAll = function(req,res) {
	userRepo.loadAll()
	.then(rows => {
		res.statusCode = 201;
		res.json(rows);
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on server console');
	})
};

exports.showOne = function(req,res) {
	
};

exports.login = function(req,res) {

};


exports.register = function(req,res) {
	var c=req.body;
  userRepo.add(c)
	.then(rows => {
		res.statusCode = 201;
		res.json({
			msg: 'user added'
		});
	})
	.catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on server console');
	})
};