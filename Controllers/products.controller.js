var db = require("../db");

module.exports.index = function(request, respone, next){
    respone.render('products/index', {
        products: db.get('products').value()
    });

    console.log(products);
};
