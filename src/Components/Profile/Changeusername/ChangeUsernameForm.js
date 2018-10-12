import React, { Component } from 'react'
import {Form, Input, Button, Modal} from 'antd'

export default class ChangePasswordForm extends Component {
   
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

    handleSubmit = async (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
              const res = await fetch(`http://localhost:1234/api/changeusername/${this.props.match.params.id}/${values.newusername}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                }
              })
              if(res.ok === true){
                this.onSuccess('Username Changed!')
              }else{
                this.onError('Username taken, try another one')
              }
            }
        })
    }

  render() {
      
    const { getFieldDecorator } = this.props.form;
    console.log(this.props)
    return (
      <div className="changeUsernameForm">
            <Form onSubmit={this.handleSubmit}>
            <Form.Item
            label="New Username"
            >
            {getFieldDecorator('newusername', {
                rules: [{
                required: true, message: 'Please enter a Username',
                }],
            })(
                <Input />
            )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Change Username</Button>
            </Form.Item>
        </Form>
      </div>
    )
  }
}
