var express = require('express');
var router  = require('express');

var controller = require('../Controllers/user.controller');
var validate =require('../validate/user.validate');
var router = express.Router();

var authMiddleware =require('../middleware/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', function(request, respone, next){
    respone.cookie('user-id', 12345);
    respone.send('Hello')
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/delete', controller.delete);

router.get('/:id', controller.view);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;