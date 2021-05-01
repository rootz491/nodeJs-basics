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
//  middleware & static files
app.use('/css',express.static('css'));
// //  handling 404         why the fuck is that!
// app.use((req, res) => {
//     res.status(404).sendFile(__dirname + '/html/404.html');
// })


//  sending dynamic EJS files
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/person/:name', (req, res) => {
    let data = obj[req.params.name];
    if (!data)
        data = anon;
    res.render('person', {name: req.params.name, data: data});
});

//  create a listener on given port
app.listen(3000);