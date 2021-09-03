const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Users', schema);