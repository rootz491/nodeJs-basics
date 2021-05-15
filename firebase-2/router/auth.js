const route = require('express').Router();
const createUser = require('../services/createUser');
const loginUser = require('../services/loginUser');

//  sign up
route.get('/auth/signup', (req, res) => {
    res.render('signup');
});

route.post('/auth/signup', createUser);

//  login
route.get('/auth/login', (req, res) => {
    res.render('login');
});

route.post('/auth/login', loginUser);



module.exports = route;