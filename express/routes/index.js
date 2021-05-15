const express = require('express');
const { obj, anon } = require('../staffData');
let router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    if(req.query.expert) {
        let data = obj[req.query.expert];
        if (!data)
            data = anon;
        res.render('person', {name: req.query.expert, data: data});
    }
    else
        res.render('contact', {ppls: Object.keys(obj)});
});

router.post('/contact', (req, res) => {
    console.log(`To ${req.body.expert}-\n${req.body.name}: ${req.body.email}\n${req.body.message}`);
    res.render('contact-response', {data: req.body});
});

module.exports = router;