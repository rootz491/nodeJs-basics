const checkIfAdmin = require('../controller/checkIfAdmin');
const adminRoute = require('../router/admin');

let router = require('express').Router();
let app = require('express')();



router.get('/', (req, res) => {
    res.json({'message': 'this is coming from an endpoint which can only be accessed by authorized users.'});
});


app.use('/admin', checkIfAdmin, adminRoute);


module.exports = router;