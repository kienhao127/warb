var db = require('../fn/Connect_database');
var md5=require('crypto-js/md5');

exports.loadAll = function() {
	var sql = `select * from staff where isDelete = 0`;
	return db.load(sql);
}

exports.loadOne = function(id) {
	var sql = `select * from staff where isDelete = 0 and id = ${id}`;
	return db.load(sql);
}

exports.login = function(c) {
	var sql = `select * from staff where username = '${c.username}' and password = '${c.password}'`;
	console.log(sql);
	return db.load(sql);
}

exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType,isDelete,phone,dob) values('${c.username}','${c.password}','${c.fullname}',${c.userType},${c.isDelete},'${c.phone}','${c.dob}')`;
	return db.write(sql);
}

// exports.delete = function(id) {
// 	var sql = `delete from staff where id = ${id}`;
// 	return db.write(sql);
// }

// exports.delete = function(id) {
// 	var sql = `delete from staff where id = ${id}`;
// 	return db.write(sql);
// }
exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	return db.write(sql);
}