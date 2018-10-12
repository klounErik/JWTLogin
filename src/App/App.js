import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'

import Login from '../Components/Login/Login'
import Home from '../Components/Home/Home'
import Reset from '../Components/Login/Reset'
import ChangePassword from '../Components/Profile/Changepassword/ChangePassword'
import ChangeUsername from '../Components/Profile/Changeusername/ChangeUsername'
import NewPassword from '../Components/Login/NewPassword'
import Profile from '../Components/Profile/Profile/Profile'
import Inbox from '../Components/Profile/Messages/Inbox'
import Register from '../Components/Register/Register'
import Logout from '../Components/Login/logout'
import Nav from '../Components/Nav/Nav'
import './App.css';
import { Layout }from 'antd'

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
      <Router>
      <Layout style={{ minHeight: '100vh' }} className="App">
        <Header className="nav">
        <Route  path="/" render={props => (<Nav {...props}/>)}/>
        </Header>
         <Content>
              <Route path="/login" render={props => (<Login {...props}/>)}/>
              <Route exact path="/" render={props => (<Home {...props}/>)}/>
              <Route path="/changepassword/:id" render={props => (<ChangePassword {...props}/>)}/>
              <Route path="/changeusername/:id" render={props => (<ChangeUsername {...props}/>)}/>
              <Route path="/logout" render={props => (<Logout {...props}/>)}/>
              <Route path="/reset" render={props => (<Reset {...props}/>)}/>
              <Route path="/inbox" render={props => (<Inbox {...props}/>)}/>
              <Route path="/newpassword/:token" render={props => (<NewPassword {...props}/>)}/>
              <Route path="/profile/:id" render={props => (<Profile {...props}/>)}/>
              <Route path="/register" render={props => (<Register {...props}/>)}/>
         </Content>
         <Footer className="footer" style={{posistion: 'absolute', textAlign: 'center', backgroundColor: '#001529'}}>
          <h1>Made of Passion for Coding</h1>
         </Footer>
      </Layout>
      </Router>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
