const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use('/assets', express.static('public'));

app.use((req, res, next) => {
    console.log(`${req.method}\t${req.url}`);
    next();
});

const urlEncodedParser = bodyParse.urlencoded({extended: false});

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
    res.sendFile(__dirname + "/html/index.html")
});

app.get('/post', (req, res) => {
    res.sendFile(__dirname + "/html/post.html")
});

app.post('/api/person/post', urlEncodedParser, (req, res) => {
    personModel.insertMany([req.body]);
    res.redirect('/');
});

//  make a handler which will handle GET req to pull data from DB
app.get('/api/person', (req, res) => {
    personModel.find({}, (err, data) => {
        if (err) throw err;
            // res.statusCode(500).json({error: 'server error'})
        res.json(data);
    });
});

app.get('/search', (req, res) => {
    if(req.query.name) {
        personModel.find({name: req.query.name}, (err, data) => {
            if (err)  throw er;
                // res.statusCode(500).json({error: 'server error'})
            res.json(data);
        });
    }
    else
        res.sendFile(__dirname + '/html/search.html');
});

app.get('/:id/delete', (req, res) => {
    personModel.findById(req.params.id).deleteOne((err, data) => {
        if (err) throw err;
        res.redirect('/');
    });
});


//  edit details handler



app.listen(3000);
console.log("server is running on http://localhost:3000");