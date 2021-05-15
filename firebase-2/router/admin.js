let router = require('express').Router();



router.get('/', (req, res) => {
    res.send('this is admin data');
});


module.exports = router;