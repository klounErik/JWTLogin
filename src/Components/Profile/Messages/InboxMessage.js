import React, { Component } from 'react'
import {decodeToken} from '../../../Auth/decodeToken'
import {Button, Popconfirm, message} from 'antd'
import { Table } from 'semantic-ui-react'

export default class InboxMessage extends Component {
      state = {
        messages: [],
      }

      confirm = (id) =>{
        this.deletePost(id)
        message.success('Message Deleted')
        this.getMessages()
      }
      
      readMessage = async(id) =>{
          const res = await fetch(`http://localhost:1234/message/readmessage/${id}`,{
            method: 'PUT'
          })
          this.getMessages()
      }

      getMessages = async () =>{
        const res = await fetch(`http://localhost:1234/message/inbox/${decodeToken().user._id}`)
        const req = await res.json()
        console.log(req)
        this.setState({messages: req})
      }

      deletePost = async (id) =>{
       const res = await fetch(`http://localhost:1234/message/deletemessage/${id}`,{
          method: 'DELETE',
          headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        console.log(res)
      }

      componentWillMount(){
        this.getMessages()
      }

      componentWillReceiveProps(){
        this.getMessages()
      }

  render() {
    const {messages} = this.state
    if(messages.length === undefined){
      return <h1>Loading.....</h1>
    } else if(messages === 'Inbox Empty'){
      return <h1 style={{textAlign: "center", color: 'white'}}>Empty</h1>

    }
    console.log(messages)
    const liste = messages.map((message, index) =>{
      return (
        <Table.Row key={index}>
        <Table.Cell>{message.read ? "Yes" : "No"}</Table.Cell>
        <Table.Cell><a href={`/profile/${message.from}`}>{message.from}</a></Table.Cell>
        <Table.Cell>{message.subject}</Table.Cell>
        <Table.Cell>{message.sent_date}</Table.Cell>
        <Table.Cell><Popconfirm  value={message._id} title="Are you sure？" onConfirm={this.confirm.bind(this,message._id)} okText="Yes" cancelText="No">
          <Button icon="delete">Delete</Button>
          </Popconfirm>
          <Button onClick={this.readMessage.bind(this,message._id)} style={{marginLeft: 10}}><a href={`/message/${message._id}`}>Read</a>
          </Button>
          </Table.Cell>
        </Table.Row>
        )
    })
    return (
      <div className="message">
          <Table className="table" selectable celled>
                <Table.Header>
                <Table.Row>
                <Table.HeaderCell>Read?</Table.HeaderCell>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>Subject</Table.HeaderCell>
                <Table.HeaderCell>Recieved</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
              <Table.Body>
                  {liste}
              </Table.Body>
            </Table>
      </div>
    )
  }
}
