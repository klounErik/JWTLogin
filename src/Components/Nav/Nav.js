import React from 'react'
import {verifyToken} from '../../Auth/verifyToken'
import {decodeToken} from '../../Auth/decodeToken'
import jwt from '../../images/jwt.png'
import { Menu, Icon, Dropdown } from 'antd'
import './style/Nav.css'

const menu = (
    <Menu theme="dark">
        <Menu.Item id="profile" key="/profile">
            <a href="/profile"><Icon type="user"/>My Profile</a>
        </Menu.Item>
        <Menu.Item id="posts"  key="/posts">
            <a href="/posts"><Icon type="mail"/>Messages</a>
        </Menu.Item>
        <Menu.Item id="logout"  key="/logout">
            <a href="/logout"><Icon type="logout"/>Logout</a>
        </Menu.Item>
    </Menu>

)

export default class Nav extends React.Component{
    render(){
   
    
        return(
            <div className="nav-nav">
                <div className="logo">
                    <a href="/">
                        <img alt="" height={75} src={jwt}></img>
                        <h1>JWT Login</h1>
                    </a>
                </div>
                <div>
                <Menu
                    className="menu"
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '100px'}}
                    >
                    {verifyToken() ? 
                        <Dropdown placement="topCenter" overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon style={{fontSize: '30px'}} type="user" />
                        {decodeToken().user.username.charAt(0).toUpperCase() + decodeToken().user.username.slice(1)}
                        </a>
                        </Dropdown>
                        :
                        <Menu className="menu"
                        theme="dark"
                        mode="horizontal"
                        style={{lineHeight: '100px'}}>
                         <Menu.Item key="/register">
                            <a href="/register"><Icon style={{fontSize: '20px'}} type="form"/>Sign up</a>
                        </Menu.Item>
                        <Menu.Item key="/login">
                            <a href="/login"><Icon style={{fontSize: '20px'}} type="login"/>Sign in</a>
                        </Menu.Item>
                        </Menu>
                    }
                    
                   </Menu>
                    
                </div>
            </div>
    )}
}