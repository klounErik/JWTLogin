import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'

export default class Home extends React.Component{
    render(){
        return(
        <div>
        {verifyToken() ?
            <h1>Welcome!</h1>
            :
            <h1>Must be logged in to see this</h1>
        }
        </div>)
    }
}