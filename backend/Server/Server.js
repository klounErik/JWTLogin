const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('../Schemas/schema')
const app = express()

const PORT = process.env.PORT || 4000
const url = `http://localhost:${PORT}/graphql`


mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}${process.env.MLAB_URL}`,{useNewUrlParser: true})

    app.use(cors({
    exposedHeaders:['Authorization'],
    allowedHeaders: ['Content-type', 'Authorization',]
    }))

    app.use(bodyParser.json())
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
      }))

    app.listen(PORT, (err) => {
        if(err){
            console.log('Could not connect to server')
        }
        console.log(`Connected to: ${PORT}, with endpoint as: ${url}`)
    })



