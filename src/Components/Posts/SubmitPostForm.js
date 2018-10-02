import React, { Component } from 'react'
import {Input,Form, Button, Modal} from 'antd'
import {decodeToken} from '../../Auth/decodeToken'

export default class SubmitPostForm extends Component {
    onSuccess = (status) =>{
        return Modal.success({
            title: status
        })
      }
      onError = (status) =>{
        return Modal.error({
          title: status
        })
      } 

    submitPost = (e) => {
            e.preventDefault()
            this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
            const res = await fetch('http://localhost:1234/post/submitpost',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: values.title, 
                content: values.message,
                user: decodeToken().user.username
            })
        })
        res.ok ? this.onSuccess('Post Submitted') : this.onError('Post not submitted')
    }
})
}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="submitPost">
            <div>
                <h1>Submit Post</h1>
                <div>
                    <Form onSubmit={this.submitPost}>
                    <Form.Item
                    label="Title"
                    >
                    {getFieldDecorator('title', {
                        rules: [{
                        required: true, message: 'Title can not be empty',
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
                        required: true, message: 'Your post can not be empty',
                        }],
                    })(
                        <Input.TextArea />
                    )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit Post</Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
      </div>
    )
  }
}
