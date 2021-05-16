const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoute = require('./router/auth');
const indexRoute = require('./router/index');
const apiRoute = require('./router/api');
const adminRoute = require('./router/admin');
const checkIfAuthenticated = require('./controller/checkIfAuthenticated');
const checkIfAdmin = require('./controller/checkIfAdmin');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

//  main controller
app.use('/user', authRoute);
app.use('/api', checkIfAuthenticated, apiRoute);
app.use('/admin', checkIfAuthenticated, checkIfAdmin, adminRoute);
app.use('/', indexRoute);

//  @TODO - Handle 404
app.use((req, res) => {
    if(res.statusCode == 403)
        res.send({ error: 'your request is missing Bearer JWTtoken' });

    else if (res.statusCode == 401)
        res.send({ error: 'You are not authorized to make this request' });
    
    else
        res.render('error', {title: '404'})
})


app.listen(3000, _ => {
    console.log('server is running at http://localhost:3000');
});