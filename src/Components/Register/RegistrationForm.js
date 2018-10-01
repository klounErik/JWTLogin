import React from 'react'
import { Form, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    status: '',
  };

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const res = await fetch('http://localhost:1234/api/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:  JSON.stringify({
            username: values.username, 
            password: values.confirm,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            country: values.country
          })
        })
          if(res.ok === true){
            res.json().then(status => this.onSuccess(status))
          }else{
            res.json().then(status => this.onError(status))
          }
        }
      })
    };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="registrationForm">
      <Form onSubmit={this.handleSubmit} className="registration-form">
       <h1>Register</h1>
      <FormItem
          {...formItemLayout}
          label="First Name"
        >
        {getFieldDecorator('firstname')(<Input />)}         
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Last Name"
        >
        {getFieldDecorator('lastname')(<Input />)}  
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Country"
          
        >
        {getFieldDecorator('country')(<Input />)}  
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your username!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
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
        </FormItem>
        <FormItem
          {...formItemLayout}
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
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className="registration-form-button" type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}
