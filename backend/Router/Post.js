const express = require('express')
const Post = express.Router()
const Posts = require('../Schemas/postSchema')

Post.post('/submitpost', (req, res)=>{
    let post = {
        title: req.body.title,
        content: req.body.content,
        user: req.body.user
    }
    Posts.create(post).then(function(post){
        res.send(post)
    })
})

Post.get('/posts', (req, res)=>{
    Posts.find({})
    .then(function(posts){
        res.send(posts)
    })
})

Post.delete('/deletepost/:id', (req,res) => {
    Posts.findOneAndDelete({_id: req.params.id})
    .then(function(post){
        res.send(post)
    })
})

Post.put('/editpost/:id', (req,res) => {
    Posts.findByIdAndUpdate({_id: req.params.id})
    .then(function(post){
        res.send(post)
    })
})

module.exports = Post