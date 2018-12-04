var tripRepo = require('../repos/TripRepos.js');
require('dotenv').config();

exports.updateTripLocation = function(req,res) {
    var tripLat = req.body.tripLat;
    var tripLong = req.body.tripLong;
    // var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.key}`;
    // var url = encodeURI(stringUrl); 
    var location = 'abc';
    var trip = {
        id: req.body.tripId,
        tripLocation: location
    };

    tripRepo.updateTripLocation(trip)
    .then(body => {
        var c={
            // address:body.results[0].formatted_address,
            // lat:body.results[0].geometry.location.lat,
            // lng:body.results[0].geometry.location.lng
        }
        res.json({
             returnCode: 1,
             message: "update trip location success!",
             object: c
        });
    })
    .catch(err=>{
            res.json({
             returnCode: 0,
             message: "update trip location fail!",
             error: err
         });
    })
 }