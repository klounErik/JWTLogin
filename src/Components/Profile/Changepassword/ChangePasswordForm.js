import React, { Component } from 'react'
import {Form, Input, Button, Modal} from 'antd'

export default class ChangePasswordForm extends Component {
   
    onSuccess = (status) =>{
        return Modal.success({
            title: status
        },
        )
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
              const res = await fetch(`http://localhost:1234/api/changepassword/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:  JSON.stringify({
                  oldpassword: values.oldpassword,
                  newpassword: values.newpassword
                })
              })
              if(res.ok === true){
                this.onSuccess('Password Changed!')
              }else{
                this.onError('Password has not been changed!')
              }
            }
        })
    }

  render() {
      
    const { getFieldDecorator } = this.props.form;
    console.log(this.props)
    return (
      <div className="changePasswordForm">
            <Form onSubmit={this.handleSubmit}>
            <Form.Item
            label="Old Password"
            >
            {getFieldDecorator('oldpassword', {
                rules: [{
                required: true, message: 'Please input your password!',
                }],
            })(
                <Input type="password" />
            )}
            </Form.Item>
            <Form.Item
            label="New Password"
            >
            {getFieldDecorator('newpassword', {
                rules: [{
                required: true, message: 'Please input your password!',
                }],
            })(
                <Input type="password" />
            )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Change Password</Button>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
