const admin = require('../services/firebase-service');
const makeUserAdmin = require('../services/makeUserAdmin');

let router = require('express').Router();
let app = require('express')();

//  routes


router.get('/', (req, res) => {
    res.json({'message': 'this is intro entypoint to API. Only authorized users can access this endpoint.'});
})

//  list of endpoints user can access
router.get('/endpoints', (req, res) => {
    let endpoints = [
        '/api',
        '/api/endpoints',
        '/api/isAdmin',
    ]

    //  list of endpoint that can only be accessed if you have `admin` custom claim as `true`
    admin
        .auth()
        .verifyIdToken(req.headers.authorization.split(' ')[1])     //  get token from authorization header.
        .then((claims) => {
            if (claims.admin === true)
                endpoints.push(
                    '/api/admin',
                    '/api/admin/users',
                );
        });
    res.json({'endpoints': endpoints});
});


//  check if user is Admin
router.get('/isAdmin', (req, res) => {
    admin
        .auth()
        .verifyIdToken(req.headers.authorization.split(' ')[1])     //  get token from authorization header.
        .then((claims) => {
            if (claims.admin === true)
                res.json({'admin': true});
            else
                res.json({'admin': false});
        });        
});

//  to make a user, Admin!
router.post('/isAdmin', (req, res) => {
    makeUserAdmin(req, res);
});


module.exports = router;