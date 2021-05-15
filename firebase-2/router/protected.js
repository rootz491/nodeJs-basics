const route = require('express').Router();



route.get('/', (req, res) => {
    res.render('index', {title: 'introduction'});
});



module.exports = route;