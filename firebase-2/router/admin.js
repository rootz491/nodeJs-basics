let router = require('express').Router();



router.get('/', (req, res) => {
    res.json({'message':'this is admin data'});
});


module.exports = router;