import React from 'react'
import RegistrationForm from './RegistrationForm'
import { verifyToken } from "../../Auth/verifyToken";
import {Redirect} from 'react-router'
import {Form} from 'antd'

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Register extends React.Component{
    render(){
        return(
        <div className="registerContainer">
            {verifyToken() ? 
            <Redirect to='/home'/>
            :
            <WrappedRegistrationForm {...this.props}/>
            }
            </div>)
    }
}