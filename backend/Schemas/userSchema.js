const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: [true, 'email is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    messages: [{}],
    posts: [{}]
})

const User = mongoose.model('users', userSchema)

module.exports = User