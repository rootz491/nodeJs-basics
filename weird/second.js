var http = require('http');

var options = {
  host: 'localhost',
  port: '8000',
  path: '/'
};

var req = http.get(options, function(res) {
    res.on('data', function (data) {
        console.log('Data from first.js script: ' + data);
    });
});
