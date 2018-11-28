
express = require('express');
var userCtrl= require('../controller/UserCtrl')

var router = express.Router();

router.route('/')
.get(userCtrl.showAll)

router.route('/login')
.get(userCtrl.login)

router.route('/register') 
.post(userCtrl.register);

module.exports = router;