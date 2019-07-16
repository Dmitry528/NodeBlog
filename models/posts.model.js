const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    prewiew: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('posts', PostsSchema);