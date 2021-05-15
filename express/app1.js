const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();


//  adding ejs as template engine
app.set("view engine", "ejs");
//  middleware & static files -> any request start with `/css` and then file name will be handled here, 
//      filename will be looked into `css` folder present at root of project.
app.use('/css',express.static('css'));
//  handling url encoded form requests before sending to router;
app.use(bodyParser.urlencoded({ extended: false }))
//  logging each request, via middleware
app.use((req, _res, next) => {
    console.log(`-> ${req.url}`);
    next();
});
//  using router as middleware
app.use('/', indexRouter);
/// send 404 & possibly a page
app.use((_req, res) => {
    res.status(404).send('page you\'re trying to access is not avaliable');
});


app.listen(3000, _ => {
    console.log('server is running on port 3000')
});