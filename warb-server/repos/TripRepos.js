var db = require('../fn/Connect_database');

exports.updateTripLocation = function(trip) {
	var sql = `update trip set tripLocation = '${trip.tripLocation}', tripLatitude = '${trip.tripLatitude}',status = '${trip.status}', tripLongitude = '${trip.tripLongitude}' where id = '${trip.id}'`;
	return db.write(sql);
}

exports.updateTripStatus = function(id,status) {
	var sql = `update trip set status = ${status} where id = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.updateDriverId = function(id,driverid) {
	var sql = `update trip set driverId = ${driverid} where id = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.addCustomer=function(cus){
	var sql =  `insert into customer(customerName,customerPhone,customerAddress,isDelete) values('${cus.customerName}','${cus.customerPhone}','${cus.customerAddress}',${cus.isDelete})`;
	console.log(sql);
	return db.write(sql);
}

exports.loadTripFull=function(cus){
	var sql = `select * from trip t,customer c,staff s where t.customerId = c.id and t.driverId=s.id ORDER BY requestTime DESC`;
	console.log(sql);
	return db.write(sql);
}
exports.loadTripFull2=function(cus){
	var sql = `select t.*, ta.id as statusId, ta.statusName, s.fullname as driverName, c.id as customerId, c.customerName, c.customerPhone, c.customerAddress from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id ORDER BY t.requestTime DESC`; 
	console.log(sql);
	return db.write(sql);
}
exports.getTripByDriverId=function(id){
    var sql = `select t.*, ta.id as statusId, ta.statusName, s.fullname as driverName, c.id as customerId, c.customerName, c.customerPhone, c.customerAddress from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id where t.driverID = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.getTripByTripId=function(id){
    var sql = `select t.*, ta.id as statusId, ta.statusName, s.fullname as driverName, c.id as customerId, c.customerName, c.customerPhone, c.customerAddress from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id where t.id = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.getTripByStatus=function(c){
    var sql = `select t.*, ta.id as statusId, ta.statusName, s.fullname as driverName, c.id as customerId, c.customerName, c.customerPhone, c.customerAddress from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id where t.status = ${c.status}`;
	console.log(sql);
	return db.write(sql);
}
exports.addTrip=function(trip){
	var sql =  `insert into trip(customerId,driverId,tripLocation,tripLongitude,tripLatitude,status,note,requestTime,isDelete) 
	values(${trip.customerId},${trip.driverId},'${trip.tripLocation}','${trip.tripLongitude}','${trip.tripLatitude}',${trip.status},'${trip.note}',${trip.requestTime},${trip.isDelete})`;
	console.log(sql);
	return db.write(sql);
}
exports.getListRequest=function(){
    var sql = `select t.*, ta.id as statusId, ta.statusName, s.fullname as driverName, c.id as customerId, c.customerName, c.customerPhone, c.customerAddress from trip t INNER JOIN customer c ON t.customerId = c.id LEFT JOIN tripstatus ta ON t.status = ta.id LEFT JOIN staff s ON t.driverId=s.id`;
	console.log(sql);
	return db.write(sql);
}