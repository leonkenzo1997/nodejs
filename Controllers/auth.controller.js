var md5 = require('md5');

var db = require("../db");

module.exports.login = function (request, respone) {
    respone.render('auth/login');
};

module.exports.postLogin = function (request, respone) {
    var errors = [];
    var email = request.body.email;
    var password = request.body.password;

    var user = db.get('users').find({email: email}).value();

    if(!user){
        errors.push('User does not exist')
        respone.render('auth/login',{
            errors: errors,
            values: request.body
        });
        return;
    }

    var hashedPassword = md5(password);

    if(user.password !== hashedPassword){
        errors.push('Your password is wrong. Please input again!!!');
        respone.render('auth/login',{
            errors: errors,
            values: request.body
        })
    }

    respone.cookie('userId', user.id, {
        signed: true
    });
    respone.redirect('/');
}; 