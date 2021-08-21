const router = require("express").Router();

router.get('/',(_, res) => {
    res.render('index.ejs')
});


module.exports = router;