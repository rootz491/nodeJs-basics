const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
});

module.exports = mongoose.model('User', schema);