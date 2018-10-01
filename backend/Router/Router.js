const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../Schemas/userSchema')
const checkHeader = require('../Auth/CheckHeader')
const verifyToken = require('../Auth/VerifyToken')
const nodemailer = require('nodemailer')

let smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });


Router.get('/users', (req,res) => {
    Users.find({})
    .then(function(users){
        res.send(users)
    })
})

Router.post('/auth', checkHeader, verifyToken, (req,res) =>{
        
})

Router.get('/user/:id', (req,res)=>{
    Users.findById(req.params.id).then(function(user){
        res.send(user)
    })
})

Router.get('/home', checkHeader, verifyToken, (req,res) =>{
    
})

Router.post('/createuser', (req,res) =>{
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        country: req.body.country,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    Users.findOne({email: user.email})
    .then(function(result){
        if(result === null || undefined){
            Users.create(user).then(function(){
                res.status(200).json('User created!')
            })
        }else{
            res.status(500).json('User could not be created')
        }
    })
})

Router.post('/login', (req,res)=>{
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    Users.findOne({username: user.username})
    .then(function(result){
        if(result === null){
            res.status(404).json('Invalid credentials')
        }else{
        if(bcrypt.compareSync(user.password, result.password)){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                user: {
                    _id: result.id,
                    email: result.email,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    country: result.country,
                    username: user.username,
                    password: user.password
                }
            }, process.env.SECRET)
            res.set({
                'Authorization': token
            })
            res.sendStatus(200)
        }else{
            res.status(403).json('Invalid credentials')
        }
    }
    })
})

Router.delete('/deleteuser/:id', (req,res) =>{
    Users.findByIdAndRemove({_id: req.params.id}).then(function(user) {
        if (user != null) {
          res.send(user)
        } else {
          res.status(404)
        }
    })
})

Router.put('/newpassword/:email', (req, res) =>{
    Users.findOneAndUpdate({email: req.params.email, password: bcrypt.hashSync(req.body.password, 10)})
    .then(function(user){
       if(user !== null){
           res.status(200).json('Password Changed')
       }else{
           res.status(500).json('Could not set new password')
       }
    })
})

Router.post('/resetpassword', (req,res) =>{
    Users.findOne({email: req.body.email}).then(function(user){
        if(user !== null){
            jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60,
                user:{
                    email: req.body.email
                }
            }, process.env.SECRET, function(err, token){
                if(err){
                    res.status(500).json('Could not reset password')
                }else{
                    let email = {
                        to: user.email,
                        from: 'jwtlogin.donotreply@gmail.com',
                        subject: 'Reset Password',
                        html: `<b>To reset your password please follow this link: <a href="http://localhost:3000/newpassword/${token}">Reset Password</a></b>`
                    }
                    smtpTransport.sendMail(email, function(err){
                        if(!err){
                           res.status(200).json('Check mail for further instructions')
                        }else{
                            res.status(500).json('Could not reset password')
                        }
                    })
            }
            })
        }else{
            res.status(404).json('Could not reset password')
        }
        })
    })

Router.put('/updateprofile/:id', (req,res)=>{
    Users.findOneAndUpdate({
        _id: req.params.id, 
         img: req.body.img,
    })
    .then(function(user){
        res.send(user)
    })
})

module.exports = Router