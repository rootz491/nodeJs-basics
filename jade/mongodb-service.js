const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_url /* 'mongodb+srv://rootx491:test@cluster0.bwcaq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' */, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const userMsg = new mongoose.Schema({
    name: String,
    email: String,
    agent: String,
    message: String
});

const jadeMsg = mongoose.model("msg", userMsg);

module.exports =  jadeMsg;
