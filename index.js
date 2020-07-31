require('dotenv').config();

console.log(process.env.SESSION_SECRET);

var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoute = require('./Routes/users.route');
var loginRoute = require('./Routes/auth.route');
var authMiddleware =require('./middleware/auth.middleware');
var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, function (request, respone) {
    respone.render('index', {
        name: "Quang"
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', loginRoute); 
// app.delete('/users/delete/:name', function(request, respone) {
//     var query = request.query.q;
    
//     var matchedUsers = db.get('users').filter(function (user) {
//         return user.name.replace(/\s/g, '').toLowerCase().indexOf(query.toLowerCase()) !== -1;
//     });
    
//     db.get('users').remove({matchedUsers}).write();
//     respone.redirect('/users');
// });

app.listen(port, function () {
    console.log('Server listening on port ' + port);
})