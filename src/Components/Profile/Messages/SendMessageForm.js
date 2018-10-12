import React, { Component } from 'react'
import {decodeToken} from '../../../Auth/decodeToken'
import {Form, Input, Button, Modal} from 'antd'

export default class SendMessageForm extends Component {

    onSuccess = (status) =>{
        return Modal.success({
            title: status
        },this.props.handleOk())
    }
    onError = (status) =>{
        return Modal.error({
        title: status
        })
    } 

    handleSubmit = async (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
              const res = await fetch(`http://localhost:1234/message/sendmessage/${decodeToken().user._id}/${values.to}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({subject: values.subject, message: values.message})
              })
              if(res.ok === true){
                this.onSuccess('Message Sent!')
              }else{
                this.onError('There was an error sending the message')
              }
            }
        })
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props)
    return (
      <div className="sendMessage">
        <Form className="sendMessageForm" onSubmit={this.handleSubmit}>
            <Form.Item
                label="To"
                >
                {getFieldDecorator('to', {
                    rules: [{
                    required: true, message: 'Please enter a recipient',
                    }],
                })(
                    <Input />
                )}
                </Form.Item>
                <Form.Item
                label="Subject"
                >
                {getFieldDecorator('subject', {
                    rules: [{
                    required: true, message: 'Please enter a subject',
                    }],
                })(
                    <Input />
                )}
                </Form.Item>
                
            <Form.Item
            label="Message"
            >
            {getFieldDecorator('message', {
                rules: [{
                required: true, message: 'Please enter a message',
                }],
            })(
                <Input.TextArea />
            )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Send Message</Button>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
