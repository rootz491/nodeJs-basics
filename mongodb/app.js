const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.url}`);
    next();
});

const urlEncodedParser = bodyParse.urlencoded({extended: false});

app.use('/assets', express.static('public'));

/*
mongoose.connect("");

const todoSchema = new mongoose.Schema({
    item: String
});

//  collection
const todoModel = mongoose.model('Todo', todoSchema);

*/


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.post('/', urlEncodedParser, (req, res) => {
    // console.log(`Name: ${req.body.name}\nAge: ${req.body.age}`);
    console.log(req.body);
    res.send(req.body);
})







app.listen(3000);
console.log("server is running on http://localhost:3000");