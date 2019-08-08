const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');
const now = new Date();
let moment = date.format(now, 'YYYY/MM/DD HH:mm:ss');

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
        type: String,
        default: moment
    },
    mainimage: {
        type: String,
        required: false
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('posts', PostsSchema);