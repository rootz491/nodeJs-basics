const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("-> "+req.url);
    if(req.url === "/" || req.url === "/home") {
        res.writeHead(200, {"Content-Type": "text/html"});
        let page = fs.createReadStream("./index.html", "utf8");
        page.pipe(res);
    } 
    else if(req.url === "/contact") {
        res.writeHead(200, {"Content-Type": "text/html"});
        let page = fs.createReadStream("./contact.html", "utf8");
        page.pipe(res);
    }
    else if(req.url === "/api/team") {
        res.writeHead(200, {"Content-Type": "application/json"});
        const myObj = [{"nik": "Developer"}, {"sudi": "Ethical hacker"}];
        res.end(JSON.stringify(myObj));
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html"});
        let page = fs.createReadStream("./404.html", "utf8");
        page.pipe(res);
    }
});

server.listen(5000, "localhost");
console.log("Server is running on http://localhost:5000");