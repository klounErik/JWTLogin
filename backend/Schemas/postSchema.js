const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Post title required']
    },
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: [true, 'A post cannot be empty']
    },
    user: {
        type: String,
        required: [true, 'A post must have a user']
    }
})

const Posts = mongoose.model('posts', postSchema)

module.exports = Posts