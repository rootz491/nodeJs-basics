const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const csrf = require("csurf");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const passportConfig = require("./services/passport");
const isAuthenticated = require("./services/auth");

const app = express();

//  connect to mongodb
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(_ => console.log('mongodb is running on port 27017'))
    .catch(err => console.log(err));

//  passport config envoke
passportConfig(passport);

//  middlewares
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'rootz491',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());

app.use('/auth', authRoutes);
app.use('/api', isAuthenticated, apiRoutes);

// error handler
app.use(function (err, req, res, next) {
    if (err.code === 'EBADCSRFTOKEN') {
        // handle CSRF token errors here
        res.status(403)   
        res.render('error', { title: 'Bad CSRF Token', status: 403, description: 'make sure your CSRF token is valid.' });
    }
})


app.listen(process.env.PORT, err => {
    if (err) console.log(err);
    else console.log("server is running on port " + process.env.PORT)
});
