var token=require('../utils/Utils.js');
express = require('express');
var userCtrl= require('../controller/UserCtrl')

var router = express.Router();

router.route('/')
.get(userCtrl.showAll)

router.route('/login')
.post(userCtrl.login)

router.route('/register') 
.post(userCtrl.register);

router.route('/id') 
.post(token.checkAccessToken,userCtrl.getUser);

module.exports = router;