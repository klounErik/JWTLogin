const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    from:{
        type: String,
        required: [true, 'Must provide sender']
    },
    to:{
        type: String,
        required: [true, 'Must provide recipient']
    },
    subject:{
        type: String,
        required: [true, 'Must provide subject']
    },
    message: {
        type: String,
        required: [true, 'Must provide message']
    },
    sent_date: {
        type: String,
        required: [true, 'Date is required']
    },
    read: {
        type: Boolean
    }
})

const Message = mongoose.model('messages', messageSchema)

module.exports = Message