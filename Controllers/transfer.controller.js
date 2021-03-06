var db = require('../db');
var shorId = require('shortid');


module.exports.create = function(request, respone, next) {
    respone.render('transfer/create', {
        csrfToken: request.csrfToken()
    });
}


module.exports.postCreate = function(request, respone, next) {
    var data = {
        id: shorId.generate(),
        amount: parseInt(request.body.amount),
        accountId: request.body.accountId,
        userId: request.signedCookies.userId
    };

    db.get('transfer').push(data).write();

    respone.redirect('/transfer/create');
}