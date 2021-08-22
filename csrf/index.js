const express = require("express");
const csrf = require("csurf");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/api.route");
const pageRoutes = require("./routes/page.route")
const unprotectedRoutes = require("./routes/unprotected.route");
require("dotenv").config();

const app = express();
const csrfValidation = csrf({cookie: true});

app.use(express.static("public"));
app.set("view-engine", "ejs");
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser({ extended: false }));
app.use(cookieParser());

//  this is route not protected by csrf (post & get req)
app.use(unprotectedRoutes);

//  these are protected against csrf attack
/*  POST request without X-CSRF-TOKEN header or _csrf in body will get 403  */
app.use('/api', csrfValidation, apiRoutes);
app.use(csrfValidation, pageRoutes);

app.listen(process.env.PORT, _ => {
    console.log('server is running on port', process.env.PORT);
});