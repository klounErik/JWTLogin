import React, { Component } from 'react'
import InboxMessage from './InboxMessage'
import SendMessage from './SendMessage'
import {Button, Icon, Modal} from 'antd'

export default class Inbox extends Component {
  state = {
    visible: false
  }

      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      handleOk = () => {
        this.setState({
          visible: false,
        });
      }

      handleCancel = () => {
        this.setState({
          visible: false,
        });
      }
              


  render() {
    return (
      <div className="messageContainer">
            <InboxMessage/>
            <div className="sendMessage">
            <Button onClick={this.showModal.bind(this)}>New Message<Icon type="mail" theme="outlined" /></Button>
            <Modal
            title="Send Message"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
              >
              <SendMessage handleOk={this.handleOk}/>
              </Modal>
            </div>
      </div>
    )
  }
}
