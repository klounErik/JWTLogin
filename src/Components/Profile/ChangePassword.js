import React, { Component } from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import {Form} from 'antd'

const WrappedChangePasswordForm = Form.create()(ChangePasswordForm);

export default class ChangePassword extends Component {
  render() {
    return (
      <div className="changepasswordContainer">
        <WrappedChangePasswordForm {...this.props} />
      </div>
    )
  }
}
