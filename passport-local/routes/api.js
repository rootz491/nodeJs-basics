const router = require('express').Router();
const {} = require('../services/api');

router.get('/home', (req, res) => {
    res.render('home', { user: req.user });
})

module.exports = router;