import React, { Component } from 'react'
import {Form, Input, Button, Modal} from 'antd'

const jwt = require('jsonwebtoken')
export default class NewPasswordForm extends Component {
    state = {
        confirmDirty: false
    }

    onSuccess = (status) =>{
        return Modal.success({
            title: status
        },
        this.props.history.push('/login')
        )
      }
      onError = (status) =>{
        return Modal.error({
          title: status
        })
      } 

    onSubmit = (e) =>{
        e.preventDefault()
        let decode =  jwt.decode(this.props.match.params.token)
        console.log(decode)
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
              const res = await fetch(`http://localhost:1234/api/newpassword/${decode.user.email}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:  JSON.stringify({
                  password: values.confirm
                })
              })
                if(res.ok){
                  this.onSuccess('Password Changed')
                }else{
                  this.onError('Could not change password')
                }
              }
            })
    }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
        } else {
        callback();
        }
        }
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }

      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="newPassword">
        <Form onSubmit={this.onSubmit} className="newPassword-form">
        <h3>Confirm new Password</h3>
         <Form.Item
          label="Password"
          >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Button type="primary" className="newPassword-form-button" htmlType="submit">Change Password</Button>
        </Form>
      </div>
    )
  }
}
