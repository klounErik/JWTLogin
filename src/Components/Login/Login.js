import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import {Redirect} from 'react-router'
import LoginForm from './LoginForm'
import { Form } from 'antd'

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default class Login extends React.Component{
render(){
    return (
    <div className="loginContainer">
    {verifyToken() ? 
    <Redirect to='/home'/>
    :
    <WrappedNormalLoginForm {...this.props}/>
    }
    </div>)
    }
}