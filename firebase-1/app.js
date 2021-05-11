const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


var serviceAccount = require("./learning-eb209-firebase-adminsdk-eoml6-4bdf4656c9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const PORT = process.env.PORT || 5000;
const app = express();

const csrfMiddleware = csrf({ cookie: true });

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(express.static(`${__dirname}/public`));

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url}`);
	next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {  
	// render the error page
	res.status(err.status || 500);
	res.render('error', {error: err});
});


app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});