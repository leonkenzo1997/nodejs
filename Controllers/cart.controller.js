module.exports.addToCart = function (request, respone, next) {
    var productId = request.params.productId;
    var sessionId = request.signedCookies.sessionId;

    if (!sessionId) {
        respone.redirect('/products');
    }

    var count = db
        .get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, count + 1)
        .write();

    respone.redirect('/products');
}