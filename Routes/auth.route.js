var express = require('express');
var router  = require('express');

var controller = require('../Controllers/auth.controller');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;