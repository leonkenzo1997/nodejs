module.exports.postCreate = function(request, respone, next){
    var errors = [];

    if(!request.body.name){
        errors.push('Name is required!!!!');
    }

    if(!request.body.phone){
        errors.push('Phone is required!!!');
    }

    if(errors.length){
        respone.render('users/create', {
            errors: errors,
            values: request.body
        });

        return;
    }

    respone.locals.success = true;
    next();
}