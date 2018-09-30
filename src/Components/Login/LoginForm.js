import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import {Redirect} from 'react-router'
import { Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

export default class NormalLoginForm extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      showError: false 
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await fetch('http://localhost:1234/api/login',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({username: values.userName, password: values.password})
        })
          if(res.ok === true){
                localStorage.setItem('token', res.headers.get('Authorization'))
                  this.props.history.push('/home')
              }else{
                localStorage.clear()
                res.text().then(status => this.setState({showError: true}))
              }
            }
        })
      }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginForm">
      {verifyToken() ? <Redirect to="/home"/> :
      <Form onSubmit={this.handleSubmit} className="login-form">
      <h3>Login</h3>
      {this.state.showError ? 
      <div className="loginError">
        <h3>Invalid Credentials</h3>
      </div> 
      : null}
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {this.props.form.isFieldsValidating ?  <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button> 
          :
          <Button loading={true} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button> 
          }
          <h3>Or <a href="/register">Register now!</a></h3>
        </FormItem>
        <h3>Having trouble logging in?<br/><a href="/reset">Reset password</a></h3>
      </Form>
      }
      </div>
    );
  }
}