var tripCtrl=require('../controller/TripCtrl.js');
express = require('express');
var token=require('../controller/TokenCtrl.js');

var router = express.Router();

router.route('/')
.post(tripCtrl.updateTripLocation);

module.exports = router;