import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      team: false,
      input: ""
    }
    console.log(this.state)
  }

  componentDidMount() {
    var that = this
    socket.on('message', function(msg){
      var temp = that.state.messages
      temp.push(msg)
      that.setState({messages: temp})
      console.log(that.state);
    })
  }

  buttonHandler(event) {
    console.log(this.state);
    socket.emit('message', {msg: this.state.input})
  }

  inputHandler(event) {
    var temp = this.state.input
    temp = event.target.value
    this.setState({input: temp})
  }

  render() {
    var rows = []
    for (var i = 0; i < this.state.messages.length; i++) {
      rows.push(<div> {this.state.messages[i].msg} </div>)
    }
    return (
      <div>
        Hello
        {rows}
        <ul id="messages"></ul>
        <form action="#">
          <input onChange={this.inputHandler.bind(this)} id="m" /> <button onClick={this.buttonHandler.bind(this)}>Send</button>
        </form>
      </div>
    )
  }
}

export default Chat
