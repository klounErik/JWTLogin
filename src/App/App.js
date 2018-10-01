import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../Components/Login/Login'
import Home from '../Components/Home/Home'
import Footer from '../Components/Footer/Footer'
import Reset from '../Components/Login/Reset'
import NewPassword from '../Components/Login/NewPassword'
import Profile from '../Components/Profile/Profile'
import Register from '../Components/Register/Register'
import Logout from '../Components/Login/logout'
import Nav from '../Components/Nav/Nav'
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" render={props => (<Nav {...props}/>)}/>
          <Route path="/login" render={props => (<Login {...props}/>)}/>
          <Route path="/" render={props => (<Home {...props}/>)}/>
          <Route path="/logout" render={props => (<Logout {...props}/>)}/>
          <Route path="/reset" render={props => (<Reset {...props}/>)}/>
          <Route path="/newpassword/:token" render={props => (<NewPassword {...props}/>)}/>
          <Route path="/profile" render={props => (<Profile {...props}/>)}/>
          <Route path="/register" render={props => (<Register {...props}/>)}/>
          <Route path="/" render={props => (<Footer {...props}/>)}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
