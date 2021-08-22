const router = require("express").Router();

router.get('/', (req, res) => {
    const csrf_token = req.csrfToken();
    res.render("index.ejs", { csrf_token });
});

router.get('/form', (req, res) => {
    const csrf_token = req.csrfToken();
    res.render("form.ejs", { csrf_token });
});

router.get('/form/async', (req, res) => {
    const csrf_token = req.csrfToken();
    res.render("async.ejs", { csrf_token });
})

module.exports = router;