let router = require('express').Router();



router.get('/', (req, res) => {
    res.render('welcome', { title: "welcome" });
});

router.get('/app', (req, res) => {
    res.render('index', {title: 'web application'});
});

router.get('/admin', (req, res) => {
    res.render('admin', {title: 'admin'});
});


module.exports = router;