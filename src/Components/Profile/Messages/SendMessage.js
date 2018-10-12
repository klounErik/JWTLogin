import React, { Component } from 'react'
import {Form} from 'antd'
import SendMessageForm from './SendMessageForm'

const WrappedSendMessageForm = Form.create()(SendMessageForm);

export default class SendMessage extends Component {
  render() {
    return (
      <div>
        <WrappedSendMessageForm {...this.props}/>
      </div>
    )
  }
}
