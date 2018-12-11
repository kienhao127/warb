var db = require('../fn/Connect_database');

exports.updateTripLocation = function(trip) {
	var sql = `update trip set tripLocation = '${trip.tripLocation}', tripLatitude = '${trip.tripLatitude}',status = '${trip.status}', tripLongitude = '${trip.tripLongitude}' where id = '${trip.id}'`;
	return db.write(sql);
}

exports.updateTripStatus = function(trip) {
	var sql = `update trip set status = '${trip.status}' where id = '${trip.id}'`;
	return db.write(sql);
}
exports.addCustomer=function(cus){
	var sql =  `insert into customer(customerName,customerPhone,customerAddress,isDelete) values('${cus.customerName}','${cus.customerPhone}','${cus.customerAddress}',${cus.isDelete})`;
	console.log(sql);
	return db.write(sql);
}
exports.addTrip=function(trip){
	var sql =  `insert into trip(customerId,driverId,tripLocation,tripLongitude,tripLatitude,status,note,requestTime,isDelete) 
	values(${trip.customerId},${trip.driverId},'${trip.tripLocation}','${trip.tripLongitude}','${trip.tripLatitude}',${trip.status},'${trip.note}',${trip.requestTime},${trip.isDelete})`;
	console.log(sql);
	return db.write(sql);
}