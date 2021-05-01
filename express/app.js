const express = require("express");

const app = express();

//  simple routing
app.get('/', (req, res) => {
    res.send("Hello World");    //  sending basic text
});
app.get('/contact', (req, res) => {
    res.send("contact page");
});
//  fetch parameter from GET request
app.get('/profile/:id', (req, res) => {
    res.send(`Profile: ${req.params.id}`);  //  access parameters
});


//  create a listener on given port
app.listen(3000);