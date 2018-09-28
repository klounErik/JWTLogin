import React from 'react'
import {decodeToken} from '../../Auth/decodeToken'
import { Upload, message, Button, Icon } from 'antd';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class ProfileContainer extends React.Component{
  render(){
  return (
    <div className="profileContainer">
        <h1>Profile</h1>
        <div className="profileInfo">
        <div className="profilepic">
          <img alt="profilepic" height={100} src={decodeToken().user.img}/>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          </div>
          <h2>First Name:</h2>
          <p>{decodeToken().user.firstname}</p>
          <h2>Last Name:</h2>
          <p>{decodeToken().user.lastname}</p>
          <h2>Email:</h2>
          <p>{decodeToken().user.email}</p>
          <h2>Username:</h2>
          <p>{decodeToken().user.username}</p>
          <h2>City:</h2>
          <p>{decodeToken().user.city}</p>
          </div>
    </div>
  )}
}