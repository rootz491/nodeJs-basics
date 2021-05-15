const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoute = require('./router/auth');
const protectedRoute = require('./router/protected');
const adminRoute = require('./router/admin');
const checkIfAuthenticated = require('./controller/checkIfAuthenticated');
const checkIfAdmin = require('./controller/checkIfAdmin');
const cookieParser = require('cookie-parser');

const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

//  main controller
app.get('/', (req, res) => {
    res.render('welcome', { title: "welcome" });
});
app.use('/user', authRoute);
app.use('/app', checkIfAuthenticated, protectedRoute);
app.use('/admin', checkIfAuthenticated, checkIfAdmin, adminRoute);


//  @TODO - Handle 404


app.listen(3000, _ => {
    console.log('server is running at http://localhost:3000');
});