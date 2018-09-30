import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'

import ProfileContainer from './ProfileContainer'

export default class Profile extends React.Component{
    render(){
        return(
        <div className="profile">
        {verifyToken() ? <ProfileContainer {...this.props}/> : this.props.history.push('/login')}
        </div>)
    }
}