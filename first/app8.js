const http = require("http");
const fs = require("fs");

//  here we are responding with data from a file for each request,
const server = http.createServer((req, res) => {
    console.log(`req: ${req.url}`);
    const myReadableStream = fs.createReadStream("./lotsOfData.txt", "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    myReadableStream.pipe(res);
});

server.listen(4000, "localhost");
console.log("server is running on http://localhost:4000");