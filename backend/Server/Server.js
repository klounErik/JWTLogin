require('dotenv').config({path: '../../config.env'})
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const Router = require('../Router/API')
const PORT = process.env.PORT || 1234

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}${process.env.MLAB_URL}`,{useNewUrlParser: true})

app.use(cors({
    exposedHeaders:['Authorization'],
    allowedHeaders: ['Content-type', 'Authorization',]
}))
app.use(bodyParser.json())
app.use('/api', Router)

app.listen(PORT, (err)=>{
    if(err){
        console.log('Could not connect to server')
    }
    console.log(`Connected to port: ${PORT}`)
})