var express = require('express');

var controller = require('../Controllers/transfer.controller');

var router = express.Router();

router.get('/create', controller.create);
router.post('/create', controller.postCreate);
module.exports = router;