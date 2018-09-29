import React from 'react'
import {decodeToken} from '../../Auth/decodeToken'

export default class ProfileContainer extends React.Component{
  render(){
  return (
    <div className="profileContainer">
        <h1>Profile</h1>
        <div className="profileInfo">
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