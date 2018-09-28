import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import {decodeToken} from '../../Auth/decodeToken'
import {Icon} from 'antd'

export default class Nav extends React.Component{
    render(){
        return(
            <div className="nav">
                <div className="login">
                    <span>
                        {verifyToken() ? <a href="/logout"> <Icon type="user" theme="outlined" />Logout</a> : <a href="/login"> <Icon type="user" theme="outlined" />Login</a>}
                    </span>
                </div>
                <div>
                     <span>
                        <a href="/home">Home</a>
                    </span>
                </div>
                <div className="user">
                    <span>
                        {verifyToken() ? <a href="/profile">{decodeToken().user.username.toUpperCase()}</a> :
                        <span/>
                        }
                    </span>
                </div>
            </div>
    )}
}