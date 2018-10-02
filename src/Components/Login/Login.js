import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router'
import { Form } from 'antd'
import './style/Login.css'

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default class Login extends React.Component{
render(){
    return (
    <div className="loginContainer">
    {verifyToken() ? <Redirect to="/"/> : <WrappedNormalLoginForm {...this.props}/>}
    </div>)
    }
}