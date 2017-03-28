import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()
const Cipher = require('../cipher')

import styles from './chat.css';

class Chat extends Component {

  constructor() {
    super()
    this.cipher = window.Cipher
    var username = "" + Math.floor(Math.random() * 1000);
    this.state = {
      userName: username  ,
      messages: [],
      players: [],
      team: false,
      input: "",
      typer: "",
      prevInput: 0,
      typers: []
    }
  }

  componentDidMount() {
    var that = this


    socket.on('message', function(msg) {
      var temp = that.state.messages
      if (msg.team === that.state.team) {
        msg.msg = that.cipher.toQWERTY(msg.msg + '', true)
      }
      temp.push(msg)
      that.setState({messages: temp})
      console.log(that.state.messages)
      var messageDiv = document.getElementById("message-div");
      messageDiv.scrollTop = messageDiv.scrollHeight;
    })
    socket.on('usersConnected', function(msg) {
        that.setState({players: msg.msg})
        console.log(that.state.players)
    })
    socket.on('newPlayer', function(msg) {
      console.log(msg.player + ' connected');
      var temp = that.state.players
      if (msg.player !== that.state.userName) {
        temp.push(msg.player)
        that.setState({players: temp})
        console.log(that.state.players)
      }
    })

    socket.on('typing', function(typer) {
      var tempTypers = that.state.typers
      if (typer.typing === true) {
        tempTypers.push(typer.user)
      }
      else {
        for (var i = 0; i < tempTypers.length; i++) {
          if (tempTypers[i] === typer.user) {
            tempTypers.splice(i,1)
          }
        }
      }
      that.setState({typers: tempTypers})
    })

    document.getElementById("message-input").addEventListener("keyup", function(event) {
      event.preventDefault()
      if (event.keyCode == 13) {
        that.sendMessage()
      }
    })
  }

  sendMessage() {
    var encoded = this.cipher.toQWERTY(this.state.input + '')
    if(this.state.input != "") {
      socket.emit('message', {msg: encoded, userName: this.state.userName, team: this.state.team})
      socket.emit('typing', {user: this.state.userName, typing: false})
      this.refs.messageInput.value = ""
      this.setState({input: "", prevInput: 0})
    }
  }

  buttonHandler(event) {
    this.sendMessage()
  }

  sendTyping(isTyping) {
    if (isTyping) {
      socket.emit('typing', {user: this.state.userName, typing: true})
    }
    else {
      socket.emit('typing', {user: this.state.userName, typing: false})
    }
  }

  inputHandler(event) {
    var temp = this.state.input
    temp = event.target.value

    if (temp.length != 0 && this.state.prevInput === 0) {
      this.sendTyping(true)
    }
    else if(temp.length === 0 && this.state.prevInput >= 0) {
      this.sendTyping(false)
    }

    var tempPrevInput = temp.length
    this.setState({
      input: temp,
      prevInput: tempPrevInput
    })
  }

  teamHandler(event) {
    var temp = !this.state.team
    this.setState({team: temp})
  }

  debugHandler(event) {
    this.cipher.makeRandomMap()
  }
  // SLETTES
  debugInputHandler(event) {
    var temp = this.state.userName
    temp = event.target.value
    this.setState({userName: temp})
  }
  // SLETTES
  debugNewPlayerHandler(event) {
    socket.emit('newPlayer', {player: this.state.userName})
  }

  render() {
    var messageRows = []
    for (var i = 0; i < this.state.messages.length; i++) {
      messageRows.push(<div className="messages" key={'message' + i} ><div className="message-user-name">{this.state.messages[i].userName}: </div> <div className="message-text"> {this.state.messages[i].msg} </div> </div>)
    }
    var typer = ""
    if(this.state.typers.length > 0) {
      for(var i = 0; i < this.state.typers.length; i++) {
        if (i === 0) {
          typer += "" + this.state.typers[i]
        }
        else {
          typer += ", " + this.state.typers[i]
        }
      }
      typer += " is typing..."
    }
    return (
      <div className="chat-div">
      <!-- SLETTES -->
      <button onClick={this.teamHandler.bind(this)}>{this.state.team.toString()}</button>
      <button onClick={this.debugHandler.bind(this)}>Debug</button>
      <input onChange={this.debugInputHandler.bind(this)} /> <button onClick={this.debugNewPlayerHandler.bind(this)}>NewPlayer</button>
      <!-- /SLETTES -->

        <div id="chat-header">
          <h2>Chat</h2>
        </div>
        <div id="message-div">
          {messageRows}
        </div>
        <div clasName="typer-name">
          {typer}
        </div>
        <div className="input-div" ref="inputDiv">
          <input onChange={this.inputHandler.bind(this)} ref="messageInput" id="message-input" /> <button onClick={this.buttonHandler.bind(this)}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat
