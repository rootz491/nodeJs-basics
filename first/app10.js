const http = require('http');

//  serving json as response

const server = http.createServer((req, res) => {
    console.log(`-> ${req.url}`);
    //  json object
    const myObj = {
        "nik": "developer",
        "sudi": "hacker"
    };
    res.writeHead(200, {"Content-Type": "application/json"});
    //  we cant simply pass json as response,
    //  response must be string or buffer
    //  so we convert json into string.
    res.end(JSON.stringify(myObj));
});

server.listen(5000, "localhost");
console.log("Server is running on http://localhost:5000");