let router = require('express').Router();
const { getAllUsers } = require('../services/firestore-service');


router.get('/', (req, res) => {
    res.json({'message':'this is admin data'});
});

router.get('/users', (req, res) => {
    getAllUsers((users) => {
        console.log(users);
        res.json({ 'users': users });
    })
})

router.post('/users', (req, res) => {
    const { userName } = req.body;
    console.log('find data of user named: '+ userName);
    res.json({ 'data': 'user PII' });
})

module.exports = router;