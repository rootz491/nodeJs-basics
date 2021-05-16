const route = require('express').Router();
const createUser = require('../services/createUser');
const loginUser = require('../services/loginUser');

//  sign up
route.get('/signup', (req, res) => {
    res.render('signup', { title: 'create new user'});
});

route.post('/signup', createUser);

//  login
route.get('/login', (req, res) => {
    res.render('login', { title: 'welcome back' });
});

route.post('/login', loginUser);



module.exports = route;