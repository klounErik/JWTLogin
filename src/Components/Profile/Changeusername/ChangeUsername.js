import React, { Component } from 'react'
import ChangeUsernameForm from './ChangeUsernameForm'
import {Form} from 'antd'

const WrappedChangeUsernameForm = Form.create()(ChangeUsernameForm);

export default class ChangeUsername extends Component {
  render() {
    return (
      <div className="changeUsernameContainer">
        <WrappedChangeUsernameForm {...this.props} />
      </div>
    )
  }
}
