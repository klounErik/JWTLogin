import React, { Component } from 'react'
import Postbox from './Postbox'
import {Form} from 'antd'
import SubmitPostForm from './SubmitPostForm'

const SubmitPost = Form.create()(SubmitPostForm);

export default class Posts extends Component {
  render() {
    return (
      <div className="posts">
            <Postbox/>
            <SubmitPost/>
      </div>
    )
  }
}
