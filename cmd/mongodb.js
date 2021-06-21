const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.bwcaq.mongodb.net/cmd?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const notes = new mongoose.Schema({
    title: String,
    body: String,
    date: Date
});

module.exports = mongoose.model("notes", notes);