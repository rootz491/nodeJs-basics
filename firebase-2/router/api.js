let router = require('express').Router();



router.get('/', (req, res) => {
    res.json({'message': 'this is coming from an endpoint which can only be accessed by authorized users.'});
});



module.exports = router;