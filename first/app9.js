const http = require("http");
const fs = require("fs");

//  serving a simple HTML page
const server = http.createServer((req, res) => {
    console.log(`-> ${req.url}`);
    const indexFile = fs.createReadStream(__dirname + '/index.html', 'utf8');
    res.writeHead(200, {"Content-Type": "text/html"});
    indexFile.pipe(res);
});

server.listen(5000, "localhost");
console.log("Server is running on http://localhost:5000");