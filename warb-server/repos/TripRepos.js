var db = require('../fn/Connect_database');

exports.updateTripLocation = function(trip) {
	var sql = `update trip set tripLocation = '${trip.tripLocation}' where id = '${trip.id}'`;
	return db.write(sql);
}