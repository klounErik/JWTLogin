const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    jwt.verify(req.token, process.env.SECRET, (err)=>{
        if(!err){
            res.send(true)
        }else{
            res.send(false)
            next()
        }
    })
}

module.exports = verifyToken
