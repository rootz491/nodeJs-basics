const checkIfAdmin = require('../controller/checkIfAdmin');
const adminRoute = require('../router/admin');

let router = require('express').Router();
let app = require('express')();


router.get('/', (req, res) => {
    res.json({'message': 'this is entypoint to API. Only authorized users can access these endpoints.'});
})

router.get('/endpoints', (req, res) => {
    res.json({'endpoints': [
            '/api',
            '/api/endpoints',
            '/api/isAdmin',
        ]
    });
});

router.get('/isAdmin', (req, res) => {
    let admin = false;
    if (req.hasOwnProperty(admin))
        admin = true;
    res.json({'admin': admin});
});


//  admin endpoint ->       /api/admin
app.use('/admin', checkIfAdmin, adminRoute);


module.exports = router;