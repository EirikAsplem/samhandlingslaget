import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import styles from './chat.css';

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      userName: "User",
      messages: [],
      team: false,
      input: "",
      typer: ""
    }
  }

  componentDidMount() {
    var that = this

    socket.on('message', function(msg) {
      var temp = that.state.messages
      temp.push(msg)
      that.setState({messages: temp})
    })

    socket.on('typing', function(typer) {
      console.log(typer.user);
    })

    document.getElementById("message-input").addEventListener("keyup", function(event) {
      event.preventDefault()
      if (event.keyCode == 13) {
        that.sendMessage()
      }
    })
  }

  sendMessage() {
    if(this.state.input != "") {
      socket.emit('message', {msg: this.state.input, userName: this.state.userName})
      this.refs.messageInput.value = ""
      this.setState({input: ""});
    }
  }

  buttonHandler(event) {
    this.sendMessage()
  }

  sendTyping() {
    //Dette trenger kun sendes en gang.. Fiks senere
    socket.emit('typing', {user: this.state.userName})
  }

  inputHandler(event) {
    var temp = this.state.input
    temp = event.target.value

    if (temp.length != 0) {
      this.sendTyping()
    }

    this.setState({input: temp})
  }

  render() {
    var rows = []
    for (var i = 0; i < this.state.messages.length; i++) {
      rows.push(<div className="messages" key={'message' + i} ><div className="message-user-name">{this.state.userName}: </div> <div className="message-text"> {this.state.messages[i].msg} </div> </div>)
    }
    return (
      <div className="chat-div">
        <div className="message-div">
            {rows}
        </div>
        <ul id="messages"></ul>
        <div className="input-div" ref="inputDiv">
            <input onChange={this.inputHandler.bind(this)} ref="messageInput" id="message-input" /> <button onClick={this.buttonHandler.bind(this)}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat
