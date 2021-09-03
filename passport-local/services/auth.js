

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else {
        req.flash('errorMsg', 'Please login to view the content');
        res.redirect('/user/login')
    }
}