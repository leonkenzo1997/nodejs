var db = require("../db");

module.exports.index = function(request, respone){

    var page = parseInt(request.query.page) || 1;
    var itemPerPage = 20;
    var start = (page - 1) * itemPerPage; 
    var end = page * itemPerPage;

    var drop = (page -1) * itemPerPage;

    respone.render('products/index', {
        // products: db.get('products').slice(start, end).value()
        products: db.get('products').drop(drop).take(itemPerPage).value()
    });
};
