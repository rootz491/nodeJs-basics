const express = require('express');
const logger = require('morgan');


let app = express();




app.set('view engine', 'jade');
app.use(logger('dev'))
app.use('/static', express.static('public'));


//  routes
app.get('/', (req, res) => {
    res.render('index', { title: 'welcome' });
});

app.get('/html', (req, res) => {
    res.sendFile('./views/index.html')
})


//  handling 404
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, _ => {
    console.log('server is running at http://localhost:3000');
})