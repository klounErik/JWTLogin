const jwt = require('jsonwebtoken')

verifyToken = (req,res,next) => {
    jwt.verify(req.token, process.env.SECRET, (err)=>{
        if(err){
            res.send(false)
        }else{
            res.send(true)
            next()
        }
    })
}

module.exports = verifyToken
