const express = require("express");

const obj = {
    "karan": {
        age: 27,
        job: "Hacker",
        address: "1337",
        hobby: [
            "Chess",
            "Coding",
            "Animes"
        ]
    },
    "sudi": {
        age: 27,
        job: "CTO",
        address: "1337",
        hobby: [
            "Football",
            "Running",
            "more Hacking"
        ]
    },
    "nik": {
        age: 27,
        job: "DevOps",
        address: "localHost",
        hobby: [
            "3D-Art",
            "Designing",
            "Manga",
            "Fun projects building",
            "Fun Tweets"
        ]
    }
}

const anon = {
    age: "null",
    job: "null",
    address: "null"
}

const app = express();

//  adding ejs as template engine
app.set("view engine", "ejs");

//  sending staic html files
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + "/html/contact.html");
});
//  sending dynamic EJS files
app.get('/profile/:name', (req, res) => {
    let data = obj[req.params.name];
    if (!data)
        data = anon;
    res.render('profile', {name: req.params.name, data: data});
});

//  create a listener on given port
app.listen(3000);