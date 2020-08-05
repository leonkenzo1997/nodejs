var db = require('../db.js');

module.exports.requireAuth = function(request, respone, next) {
    console.log(request.cookies, request.signedCookies);
    if(!request.signedCookies.userId){
        respone.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({ 
        id: request.signedCookies.userId 
    }).value();

    if(!user){
        respone.redirect('/auth/login');
        return;
    }

    respone.locals.user = user;
    next();
}