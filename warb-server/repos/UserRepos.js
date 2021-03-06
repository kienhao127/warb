var db = require('../fn/Connect_database');
var md5=require('crypto-js/md5');

exports.loadAll = function() {
	var sql = `select * from staff where isDelete = 0`;
	console.log(sql);
	return db.load(sql);
}

exports.loadOne = function(id) {
	// console.log("id load one :"+id);
	var sql = `select * from staff where isDelete = 0 and id = ${id}`;
	console.log(sql);
	return db.load(sql);
}
exports.loadOnebyType = function(type) {
	
	var sql = `select * from staff where isDelete = 0 and userType = ${type}`;
	console.log(sql);
	return db.load(sql);
}
exports.loadForType = function(difriend) {
	if(difriend===0)
	{
		var sql = `select * from staff where isDelete = 0 and userType = 4`;
	    console.log(sql);
	    return db.load(sql);
	}else{
		var sql = `select * from staff where isDelete = 0 and userType != 4`;
	   console.log(sql);
	    return db.load(sql);
	}
	
}
exports.getDriverById = function(id) {
	var sql = `select * from driver where staffId  = '${id}'`;
	console.log(sql);
	return db.load(sql);
}
exports.getDriverById2 = function(id) {
	var sql = `select * from driver v,staff st where v.staffId=st.id and  staffId  = '${id}'`;
	console.log(sql);
	return db.load(sql);
}
exports.getUserByRefreshToken = function(reToken) {
	//var sql = `select * from staff st ,token tk where tk.refresh_token = '${reToken}' and st.id=tk.id_user`;
	var sql=`select * from token tk INNER JOIN staff st ON tk.id_user=st.id LEFT JOIN driver v ON tk.id_user = v.staffId where tk.refresh_token = '${reToken}'`
	console.log(sql);
	return db.load(sql);
}
//from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id ORDER BY t.requestTime DESC`; 
exports.getDriverByRefreshToken = function(reToken) {
	var sql = `select * from staff st ,token tk,driver v where tk.refresh_token = '${reToken}' and st.id=tk.id_user and st.id=v.staffId`;
	console.log(sql);
	return db.load(sql);
}
exports.login = function(c) {
	var sql = `select * from staff where username = '${c.username}' and password = '${c.password}'`;
	console.log(sql);
	return db.load(sql);
}

exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType,isDelete,phone,dob) values('${c.username}','${c.password}','${c.fullname}',${c.userType},${c.isDelete},'${c.phone}','${c.dob}')`;
	console.log(sql);
	return db.write(sql);
}

exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.loadDriver = function(id) {
	var sql = `delete from staff where id = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.addDriver=function(driver)
{
	var sql = `insert into driver(staffId,status) values('${driver.staffId}',${driver.status})`;
	console.log(sql);
	return db.write(sql);
}
exports.updateStausDriver=function(id,status)
{
	var sql = `update driver set status = ${status} where staffId = ${id}`;
	console.log(sql);
	return db.write(sql);
}