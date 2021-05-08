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



mongoose.connect("mongodb+srv://test:test@todo.37zp7.mongodb.net/Person?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

//  collection
const personModel = mongoose.model('Person', personSchema);



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});


app.post('/', urlEncodedParser, (req, res) => {
    console.log(`Name: ${req.body.name}\nAge: ${req.body.age}`);
    console.log(req.body);
    personModel.insertMany([req.body]);
    res.sendFile(__dirname + "/public/index.html");
});


//  make a handler which will handle GET req to pull data from DB
app.get('/api/persons', (req, res) => {
    personModel.find({}, (err, data) => {
        if (err) throw err;
        res.json({people: data});
    });
});







app.listen(3000);
console.log("server is running on http://localhost:3000");