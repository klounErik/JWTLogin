import {verifyToken} from './verifyToken'
const jwt = require('jsonwebtoken')

export const decodeToken = () =>{
   if(verifyToken()){
       const decodedToken = jwt.decode(localStorage.getItem('token'))
        return decodedToken
   }else{
       return null
   }
}