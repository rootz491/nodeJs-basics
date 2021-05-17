let router = require('express').Router();



router.get('/', (req, res) => {
    res.json({'message':'this is admin data'});
});

router.get('/users', (req, res) => {
    res.json({ 'users': 'list of all users' });
})

router.post('/users', (req, res) => {
    const { userName } = req.body;
    console.log('find data of user named: '+ userName);
    res.json({ 'data': 'user PII' });
})

module.exports = router;