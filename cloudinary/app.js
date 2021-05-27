let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
const upload = require('./multer');



let app = express();


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));






app.get('/', (req, res) => {
    res.render('index', {title: 'home'});
});

app.get('/post', (req, res) => {
    res.render('post', {title: 'post images', error: '', success: ''});
});

app.post('/post', (req, res) => {
    upload(req, res, err => {
        console.log(req.body.imgName, req.file);
        if(err)
            res.render('post', {title: 'post images', error: err, success: ''});
        else
            res.render('post', {title: 'post images', error: '', success: 'upload successful'});
    });
});




app.use((req, res) => {
    res.status(404).send('resource not found');
})


app.listen(3000, _ => {
    console.log('server is running on http://localhost:3000');
})