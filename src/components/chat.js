import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()
const Cipher = require('../cipher')

import styles from './chat.css';

class Chat extends Component {

  constructor(props) {
    super(props)
    this.cipher = window.Cipher
    this.state = {
      userName: "username",
      messages: [],
      players: [],
      names: [],
      team: props.team,
      input: "",
      prevInput: 0,
      typers: [],
      playerinfoUpdated: false
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({team: nextProps.team})
  }

  componentDidMount() {
    var that = this

    socket.on('message', function(msg) {
      console.log(msg.msg)
      var temp = that.state.messages
      if (msg.team === that.state.team) {
        msg.msg = that.cipher.toQWERTY(msg.msg + '', true)
      }
      temp.push(msg)
      that.setState({messages: temp})
      //console.log(that.state.messages)
      var messageDiv = document.getElementById("message-div");
      messageDiv.scrollTop = messageDiv.scrollHeight;
    })
    socket.on('usersConnected', function(msg) {
      that.setState({players: msg.msg})
      for (var key in that.state.players) {
        if (that.state.players[key].team === that.state.team && that.state.players[key].map != "") {
          console.log('setting new map');
          that.cipher.setMap(that.state.players[key].map)
        }
      }
      console.log(that.state.players)
    })

    socket.on('userDisconnected', function(msg) {
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
            break;
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
      this.sendTyping(false)
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
    socket.emit('updatePlayerInfo', {name: this.state.userName, team: this.state.team, map: this.cipher.map})
    this.setState({playerinfoUpdated: true})
  }
  // SLETTES NÅR HÅVARD ER FERDIG
  debugInputHandler(event) {
    var temp = this.state.userName
    temp = event.target.value
    this.setState({userName: temp})
  }
  // SLETTES


  render() {
    var messageRows = []
    for (var i = 0; i < this.state.messages.length; i++) {
      messageRows.push(<div className="messages" key={'message + i'} ><div className="message-user-name">{this.state.messages[i].userName} </div> <div className="message-text"> {this.state.messages[i].msg} </div> </div>)
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
    var playerinfo = []
    if (!this.state.playerinfoUpdated) {
      playerinfo.push(<div>
      Name: <input onChange={this.debugInputHandler.bind(this)} />
      <button onClick={this.debugHandler.bind(this)}>Send</button></div>)
    }

    return (
      <div className="chat-div">

      {playerinfo}

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
//<button onClick={this.teamHandler.bind(this)}>Team: {this.state.team.toString()}</button>
export default Chat
