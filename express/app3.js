const express = require("express");
const bodyParser = require("body-parser");

const obj = {
    "karan": {
        age: "NaN",
        job: "Bug buunty hunter",
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

const urlEncodedParser = bodyParser.urlencoded({extended: false})

//  adding ejs as template engine
app.set("view engine", "ejs");
//  middleware & static files -> any request start with `/css` and then file name will be handled here, 
//      filename will be looked into `css` folder present at root of project.
app.use('/css',express.static('css'));
//  logging each request, via middleware
app.use((req, res, next) => {
    console.log(`-> ${req.url}`);
    next();
})

//  sending dynamic EJS files
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    //  checking if query has attached to url/path
    if(req.query.expert) {
        let data = obj[req.query.expert];
        if (!data)
            data = anon;
        res.render('person', {name: req.query.expert, data: data});
    }
    //  esle show simple contact page
    else
        res.render('contact', {ppls: Object.keys(obj)});
});
//  handling POST request
app.post('/contact', urlEncodedParser, (req, res) => {
    console.log(`To ${req.body.expert}-\n${req.body.name}: ${req.body.email}\n${req.body.message}`);
    res.render('contact-response', {data: req.body});
});


/*  instead of showing ppls in seperate paths, we can show then in `/contact?person=xyz` path

app.get('/person/:name', (req, res) => {
    let data = obj[req.params.name];
    if (!data)
        data = anon;
    res.render('person', {name: req.params.name, data: data});
});
*/


//  create a listener on given port
app.listen(3000);