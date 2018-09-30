import React from 'react'
import {checkAuth} from '../../Auth/checkAuth'
import ProfileContainer from './ProfileContainer'

export default class Profile extends React.Component{

    componentWillMount(){
        checkAuth()
        .then(res => res ?  null : this.props.history.push('/logout'))
    }
    render(){
        return(
        <div className="profile">
        <ProfileContainer {...this.props}/>
        </div>)
    }
}