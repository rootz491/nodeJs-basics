const router = require('express').Router();

router.get('/', (req, res) => {
    res.render(__dirname, '/../views/login.ejs', {"csrf-token": req.csrfToken()});
})


module.exports = router;