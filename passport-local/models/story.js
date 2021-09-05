const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model("Story", storySchema);