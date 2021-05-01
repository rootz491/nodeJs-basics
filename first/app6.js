const http = require("http");

//  simple server
const server = http.createServer((req, res) => {
    //  logging request's path
    console.log(`req -> ${req.url}`);
    //  adding header to response
    res.writeHead(200, {"Content-Type": "text/html"});
    //  adding body to response
    res.end("<h1>Hello World</h1>");
});

//  starting a listener for the server
server.listen(3000, "127.0.0.1");
console.log("server is listening on  http://127.0.0.1:3000");
