const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = require('date-and-time');
const now = new Date();
let moment = date.format(now, 'YYYY/MM/DD HH:mm:ss');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: moment
    }
}, {
        versionKey: false
    });

module.exports = mongoose.model('user', userSchema);