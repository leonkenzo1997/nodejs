var shortid = require('shortid');

var db = require("../db");

module.exports.session = function(request, respone, next){
    if(!request.signedCookies.sessionId){
        var sessionId = shortid.generate();
        respone.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({ 
            id: sessionId
        }).write();

        next();
    }
}