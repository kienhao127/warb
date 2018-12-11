var tripCtrl=require('../controller/TripCtrl.js');
express = require('express');
var token=require('../controller/TokenCtrl.js');

var router = express.Router();

router.route('/updateTrip')
.post(token.checkAccessToken,tripCtrl.updateTripLocation);

router.route('/updateTripStatus')
.post(token.checkAccessToken,tripCtrl.updateTripStatus);

router.route('/addCustomerAndTrip')
.post(token.checkAccessToken,tripCtrl.addCustomerAndTrip);
module.exports = router;