let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let imgSchema = new mongoose.Schema({
    cloudinary_id: String,
    url: String,
    key: String,
});

const imgModel = mongoose.model('Imgges', imgSchema);


module.exports = imgModel;

