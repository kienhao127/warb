var map=require('../controller/MapCtrl.js');
express = require('express');
var token=require('../controller/TokenCtrl.js');

var router = express.Router();

router.route('/')
.post(map.getLatLong)

module.exports = router;