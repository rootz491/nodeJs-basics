var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/info', (req, res) => {
  res.render('index', { title: 'info' });
})

module.exports = router;
