var tripCtrl=require('../controller/TripCtrl.js');
express = require('express');
var token=require('../controller/TokenCtrl.js');

var router = express.Router();

router.route('/updateTripLocation')
.post(tripCtrl.updateTripLocation);

router.route('/updateTripStatus')
.post(tripCtrl.updateTripStatus);

module.exports = router;