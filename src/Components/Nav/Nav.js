import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import jwt from '../../images/jwt.png'

export default class Nav extends React.Component{
    render(){
        return(
            <div className="nav">
                <div className="logo">
                   <a href="/home"><img alt="" id="jwt" height={75} src={jwt}/></a>
                    <div className="logotext">
                    <h3>JWT Login</h3>
                    <p>A JWT project</p>
                    </div>
                  </div>
                {verifyToken() ? 
                <div className="myprofile">
                   <ul>
                       <span>
                           <a href="/profile">My Profile</a>
                       </span>
                   </ul>
                   <ul>
                       <span>
                           <a href="/logout">Sign Out</a>
                       </span>
                   </ul>
                   </div>
                :
                <div className="nav-signin">
               <div>
                   <ul>
                       <span>
                           <a href="/login">Sign in</a>
                       </span>
                   </ul>
                   </div>
                   <div>
                   <ul>
                       <span>
                           <p>or</p>
                       </span>
                   </ul>
                   </div>
                   <div>
                   <ul>
                       <span>
                           <a href="/register">Sign up</a>
                       </span>
                   </ul>
                   </div>
               </div>
                } 
               
            </div>
    )}
}