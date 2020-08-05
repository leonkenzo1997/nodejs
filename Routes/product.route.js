var express = require('express');

var controller = require('../Controllers/product.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;