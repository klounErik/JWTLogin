import React from 'react'
import {Button, Popconfirm, message } from 'antd'
import {decodeToken} from '../../../Auth/decodeToken'

export default class ProfileContainer extends React.Component{

  confirm = () =>{
    message.success('User Successfully deleted')
    this.deleteUser(decodeToken().user._id)
    localStorage.clear()
    this.props.history.push('/home')
  }
    // getUser = async () =>{
    //   const res = await fetch(`http://localhost:1234/api/user/${decodeToken().user._id}`)
    //   const req = await res.json()
    //   console.log(req)
    // }
      
    deleteUser = async (id) =>{
      const res = await fetch(`http://localhost:1234/api/deleteuser/${id}`,{
        method: 'DELETE'
      })
      const req = await res.json()
      console.log(req)
    }

  render(){
    console.log(decodeToken())
  return (
    <div className="profileContainer">
        <div className="profileInfo">
        <h1>Profile</h1>
        <hr/>
          <h2>First Name:</h2>
          <p>{decodeToken().user.firstname}</p>
          <h2>Last Name:</h2>
          <p>{decodeToken().user.lastname}</p>
          <h2>Email:</h2>
          <p>{decodeToken().user.email}</p>
          <h2>Username:</h2>
          <p>{decodeToken().user.username}</p>
          <div className="buttongroup">
          <Button><a href={`/changepassword/${decodeToken().user._id}`}>Change Password</a></Button>
          <Button><a href={`/changeusername/${decodeToken().user._id}`}>Change Username</a></Button>
          <Popconfirm title="Are you sure？" onConfirm={this.confirm} okText="Yes" cancelText="No">
          <Button>Delete User</Button>
          </Popconfirm>
          </div>
          </div>
    </div>
  )}
}