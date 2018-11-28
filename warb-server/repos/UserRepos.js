var db = require('../fn/Connect_database');

exports.loadAll = function() {
	var sql = `select * from staff`;
	return db.load(sql);
}

exports.loadOne = function(c) {
	var sql = `select * from staff where id = ${id}`;
	return db.load(sql);
}

exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType) values('${c.username}','${c.password}','${c.fullname}',${c.userType})`;
	return db.write(sql);
}

exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	return db.write(sql);
}