import React, { Component } from 'react'
import './gameboard.css'
import './slider.css'
import './popup.css'
//import game from 'img/Froggy1.png'

class Gameboard extends Component {

  togglePopup(event) {
    console.log("got here");
    var popup = document.getElementsByClassName("myPopup")[0];
    popup.classList.toggle("show");
  }


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
        <h1>Crack the Code</h1>
        <div id="progressBar">
          <span>Opponent</span><input type="range"  min="0" max="100"/> <span>Us</span>
        </div>
        <img id="gameView" src='http://joshuahunter.com/images/flexbox_froggy_19start.png'/>
        <button id="questionMark" onClick={this.togglePopup.bind(this)}>?</button>
        <div className="myPopup"><span id="popuptext">An explanations of the current puzzle will be displayed here. 
        The purpose of this is to provide hints to the players when needed and to understand the solutions of the puzzle at the end.</span></div>
      </div>
    )
  }
}

export default Gameboard