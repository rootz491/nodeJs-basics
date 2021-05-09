const path = './.data/secure-connect-learning.zip';
const { Client } = require('cassandra-driver');
const client = new Client({
    cloud: { 
        secureConnectBundle: path 
    },
    credentials: {
        username: process.env.ASTRAUSERNAME, 
        password: process.env.ASTRAPASSWORD
    }
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Better Botz' });
});
  
router.get('/datareport', function (req, res) {
    getMoreData().then(function(data){
        res.render('datareport', { data } );
    }).catch(function(filteredData){
        res.send(filteredData);
    })
});
  
router.get('/data', function (req, res) {
    getMoreData().then(function(data){
        res.send(data);
    }).catch(function(filteredData){
        res.send(filteredData);
    })
});
  