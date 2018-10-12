const express = require('express')
const Messages = express.Router()
const verifyToken = require('../Auth/VerifyToken')
const checkHeader = require('../Auth/CheckHeader')
const Message = require('../Schemas/messageSchema')
const Users = require('../Schemas/userSchema')

Messages.get('/getmessages', (req, res) => {
    Message.find({}).then(function(result){
        res.send(result)
    })
})

Messages.get('/inbox/:id', (req,res)=>{
    Users.findById({_id: req.params.id})
    .then(function(result){
        Message.find({to: result.username})
        .then(function(messages){
            if(messages.length === 0){
                res.json('Inbox Empty')
            }else{
                res.send(messages)
            }
            })
        })
    })

Messages.put('/readmessage/:id', (req,res)=>{
    Message.findByIdAndUpdate(req.params.id,{read: true})
    .then(function(message){
        if(message !== null){
            res.send(message)
        }
    })
})

Messages.delete('/deletemessage/:id', checkHeader, (req, res) =>{
    Message.findByIdAndRemove({_id: req.params.id})
    .then(function(message){
        if(message !== null){
            res.status(200).json('Successfully deleted the message')
        }else{
            res.status(404).json('Could not delete message')
        }
    })
})

Messages.post('/sendmessage/:from/:to',(req, res) =>{
    let date = new Date()
    let time = date.toLocaleString('de-DE')
    Users.findOne({username: req.params.to}).then(function(to){
        if(to !== null){
            Users.findById({_id: req.params.from}).then(function(from){
                if(from !== null){
                    const message = {
                        to: to.username,
                        from: from.username,
                        subject: req.body.subject,
                        message: req.body.message,
                        from_id: from._id,
                        to_id: to._id,
                        sent_date: time,
                        read: false
                    }
                    Message.create(message).then(function(){
                        res.status(200).json('Message sent')
                    })
                }
            })
        }else{
            res.status(404).json('Message not sent')
        }
    })
})



module.exports = Messages