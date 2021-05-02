const express = require('express');

const app = express();

const todoController = require('./controllers/todoController');

//  setting template engine
app.set('view engine', 'ejs');

//  static files handler
app.use('/assets', express.static('public'));

//  req logger
app.use((req, res, next) => {
    console.log(`-> ${req.url}`);
    next();
});

//  calling controller
todoController(app);

//  listener
app.listen(3000);
console.log('server is listening on port http://localhost:3000')