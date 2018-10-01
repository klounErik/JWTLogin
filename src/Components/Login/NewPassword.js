import React, { Component } from 'react'
import {checkResetToken} from '../../Auth/checkResetToken'
import NewPasswordForm from './NewPasswordForm'
import {Form ,Modal} from 'antd'

const WrappedNormalLoginForm = Form.create()(NewPasswordForm);

export default class NewPassword extends Component {

    componentWillMount(){
        checkResetToken(this.props.match.params.token)
        .then(res => res ? null : this.onError('Link have expired'))
    }

      onError = (status) =>{
        return Modal.error({
          title: status
        },this.props.history.push('/login'))
      } 


render() {
    return (
      <div className="newPasswordContainer">
        <WrappedNormalLoginForm {...this.props}/>
      </div>
    )
  }
}
