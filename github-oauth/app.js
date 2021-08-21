const express = require("express");
const passport = require("passport");
const GithubStratergy = require("passport-github2").Strategy;
const session = require("express-session");
const helmet = require("helmet");
const logger = require("morgan");
require('dotenv').config();

const authRoutes = require('./routes/auth.route');
const publicRoutes = require("./routes/public.route");
const protectedRoutes = require('./routes/protected.route');
const isAuthenticated = require("./services/verification.service");


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GithubStratergy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}:${process.env.PORT}/auth/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
    }
));

const app = express();

app.set("view-engine", "ejs");
app.use('/public', express.static(__dirname + '/public'));
app.use(helmet());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));



app.use('/auth', authRoutes);
app.use('/app', isAuthenticated, protectedRoutes);
app.use(publicRoutes);

app.listen(process.env.PORT, _ => {
    console.log('server is running on port ', process.env.PORT)
});