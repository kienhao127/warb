var db = require('../fn/Connect_database');
var md5=require('crypto-js/md5');

exports.loadAll = function() {
	var sql = `select * from staff where isDelete = 0`;
	return db.load(sql);
}

exports.loadOne = function(c) {
	var sql = `select * from staff where isDelete = 0 and id = ${id}`;
	return db.load(sql);
}

exports.login = function(c) {
	var md5_pwd=md5(c.password);
	var sql = `select * from staff where username = '${c.username}' and password = '${md5_pwd}'`;
	console.log(sql);
	return db.load(sql);
}

exports.add = function(c) {
	var md5_pwd=md5(c.password);
	var sql = `insert into staff(username,password,fullname,userType,isDelete) values('${c.username}','${md5_pwd}','${c.fullname}',${c.userType},${c.isDelete})`;
	return db.write(sql);
}

exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	return db.write(sql);
}
exports.getRefreshToken = function(rows) {
	var sql = `select * from token where id_user = ${rows[0].id}`;
	return db.write(sql);
}
exports.deleteRefreshToken = function(id) {
	var sql = `delete * from token where id_user = ${id}`;
	return db.write(sql);
}
exports.addRefreshToken = function(c) {
	var sql = `insert into token(id_user,refresh_token,isFrist) values('${c.id_user}','${c.refresh_token}',${c.isFrist})`;
	return db.write(sql);
}
exports.getRefreshTokenByToken = function(token) {
	var sql = `select * from token where refresh_token = ${token}`;
	return db.write(sql);
}
