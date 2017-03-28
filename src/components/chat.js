import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()
const Cipher = require('../cipher')

import styles from './chat.css';

class Chat extends Component {

  constructor() {
    super()
    this.cipher = window.Cipher
    this.state = {
      userName: "User",
      messages: [],
      players: [],
      team: false,
      input: ""
    }
  }

  componentDidMount() {
    var that = this



    socket.on('message', function(msg){
      var temp = that.state.messages
      if (msg.team === that.state.team) {
        msg.msg = that.cipher.toQWERTY(msg.msg + '', true)
      }
      temp.push(msg)
      that.setState({messages: temp})
      console.log(that.state.messages)
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

    document.getElementById("message-input").addEventListener("keyup", function(event) {
      event.preventDefault()
      if (event.keyCode == 13) {
        that.sendMessage()
      }
    })
  }


  sendMessage() {
    var encoded = this.cipher.toQWERTY(this.state.input + '')
    socket.emit('message', {msg: encoded, userName: this.state.userName, team: this.state.team})
    this.refs.messageInput.value = ""
  }

  buttonHandler(event) {
    this.sendMessage()
  }

  inputHandler(event) {

    var temp = this.state.input
    temp = event.target.value
    this.setState({input: temp})
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
    var rows = []
    for (var i = 0; i < this.state.messages.length; i++) {
      rows.push(<div className="messages" key={'message' + i} ><div className="message-user-name">{this.state.userName}: </div> <div className="message-text"> {this.state.messages[i].msg} </div> </div>)
    }
    return (
      <div className="chat-div">
      <!-- SLETTES -->
      <button onClick={this.teamHandler.bind(this)}>{this.state.team.toString()}</button>
      <button onClick={this.debugHandler.bind(this)}>Debug</button>
      <input onChange={this.debugInputHandler.bind(this)} /> <button onClick={this.debugNewPlayerHandler.bind(this)}>NewPlayer</button>
      <!-- /SLETTES -->
        <div className="message-div">
            {rows}
        </div>
        <div className="input-div" ref="inputDiv">
            <input onChange={this.inputHandler.bind(this)} ref="messageInput" id="message-input" /> <button onClick={this.buttonHandler.bind(this)}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat
