const http = require('http');

const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('super secret!');
}).listen(8000, '127.0.0.1');