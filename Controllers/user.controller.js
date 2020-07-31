var db = require("../db");
var shortid = require('shortid');

module.exports.index = function (request, respone) {
    respone.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function (request, respone) {

    var query = request.query.q;

    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.replace(/\s/g, '').toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    respone.render('users/index', {
        users: matchedUsers,
        search: query
    });
};

module.exports.create = function (request, respone) {
    console.log(request.cookies);
    respone.render('users/create');
};

module.exports.delete = function (request, respone) {
    respone.render('users/delete');
};

module.exports.view = function (request, respone) {
    var id = request.params.id;

    var user = db.get('users').find({ id: id }).value();
    console.log(user);

    respone.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function (request, respone) {
    request.body.id = shortid.generate();
    
    console.log(respone.locals);

    db.get('users').push(request.body).write();
    respone.redirect('/users');
};