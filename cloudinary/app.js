let cloudinary = require('./cloudinary');
const streamifier = require('streamifier');
let fileUpload = require('./multer');
let express = require('express');
let logger = require('morgan');
let imgModel = require('./mongodb');


let app = express();


app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/public', express.static('public'));


//  get homepage
app.get('/', (req, res) => {
    imgModel.find({}, (err, data) => {
        if (err) throw err
        else {
            res.render('index', {title: 'home', data});
        }
    });
});

//  send upload form
app.get('/post', (req, res) => {
    res.render('post', {title: 'post images', error: '', success: ''});
});

//  delete img
app.get('/image/:storage_id', async (req, res) => {
    try {
        //  find image on mongodb
        let img = await imgModel.findById(req.params.storage_id);
        //  delete from cloudinary
        await cloudinary.uploader.destroy(img.cloudinary_id);
        //  delete from mongodb
        await img.remove();
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

//  upload img
app.post('/post', fileUpload.single('img'), function (req, res) { 
    //  first upload the img
    streamifier.createReadStream(req.file.buffer).pipe(cloudinary.uploader.upload_stream( {
            //  to this folder, in the cloudinary
            folder: 'learning',
        },
        (error, result) => {
            if (result) {
                //  get metadata of uploaded img
                console.log(result);
                //  push data to mongoDB 
                imgModel.insertMany([{
                    cloudinary_id: result.public_id,
                    url: result.secure_url,
                    key: req.body.key,
                }]);
                //  send back result
                res.render('post', {title: 'post', success: 'upload successful', error: ''});
            } else {
                console.error(error);
            }
        }
    ));
});



app.use((req, res) => {
    res.status(404).send('resource not found');
});


app.listen(3000, _ => {
    console.log('server is running on http://localhost:3000');
})



/*
long method for uploading
app.post('/post/longMethod', fileUpload.single('img'), function (req, res) {

    let stream = cloudinary.uploader.upload_stream( {
            folder: 'learning',
        },
        (error, result) => {
            if (result) {
                console.log(result);
                imgs.push(result.url);
                res.render('index', {title: 'home', imgs, imgName: req.body.imgName});
            } else {
                console.error(error);
            }
        }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
});


*/