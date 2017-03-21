import React, { Component } from 'react'

class Gameboard extends Component {

 /*
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
    socket.on('userConnected', function(msg) {
      var temp = that.state.messages
      temp.push(msg)
      that.setState({messages: temp})
      console.log(that.state);
    })
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
*/
  render() {
    
    return (
      <div id="gameboard">
        Hello
      </div>
    )
  }
}

export default Gameboard