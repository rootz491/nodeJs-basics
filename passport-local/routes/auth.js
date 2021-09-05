const User = require('../models/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', {"csrfToken": req.csrfToken()});
});

router.get('/signup', (req, res) => {
    res.render('signup', { "csrfToken": req.csrfToken() });
    // res.json({world: "good"})
});

router.post('/login', 
    (req, res, next) => passport.authenticate('local', {
        successRedirect: '/api/home', 
        failureRedirect: '/auth/login'
    })(req, res, next)
);

router.post('/signup', async (req, res) => {
    const { username, email, password, cpassword } = req.body;

    // todo: user input validation

    if (password === cpassword) {
        const newUser = new User({ username, email, password, stories: [] })

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(newUser.password, salt);

        console.log(hash)
        newUser.password = hash;

        newUser.save()
            .then(() => {
                console.log('signup completed');
                res.redirect('/auth/login')
            })
            .catch(err => {
                console.log(err);
                res.render('signup', {error: err})
            });

    } else res.render('signup', {error: 'password mismatch'});
});

// logout handling
router.get('/user/logout', (req, res) => {
    req.logout(); // provided by the passport
    req.flash('successMsg', 'Successfully logged out'); // creating new success msg for logout
    res.redirect('/user/login');
});

module.exports = router;