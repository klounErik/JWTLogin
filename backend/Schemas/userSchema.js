const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [false, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [false, 'username is required']
    },
    email: {
        type: String,
        required: [false, 'username is required']
    },
    city: {
        type: String,
        required: [false, 'username is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        default: 'https://www.brandeps.com/icon-download/U/User-02.svg',
        required: false
    }
})


const User = mongoose.model('users', userSchema)

module.exports = User