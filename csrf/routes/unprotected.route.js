const router = require("express").Router();

router.get('/form/free', (_, res) => {
    res.render("free.ejs");
})

router.post('/free', (_, res) => {
    res.send("I'm also a POST request but on csrf is required to hit me");
});

module.exports = router;