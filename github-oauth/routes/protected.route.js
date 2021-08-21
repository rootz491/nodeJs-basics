const router = require("express").Router();

router.get('/profile',(req, res) => {
    res.render('profile.ejs', { user: req.user })
});


module.exports = router;