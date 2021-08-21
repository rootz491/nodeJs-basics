const router = require("express").Router();
const passport = require("passport");



router.get('/github', 
    passport.authenticate('github', { scope: [ 'user:email' ] })
);

router.get('/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/login' }),
    (_, res) => res.redirect(200, '/app/profile')
)


router.get('/login', (_, res) => {
    res.render('login.ejs');
})



module.exports = router;