import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import FrogComponent from './frogComponent'
import CssComponent from './cssComponent'

import './gameboard.css'
import './slider.css'
import './popup.css'

class Gameboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: props.show,
      team: props.team,
      gameStatus: 50,
      backgroundNumber: 2
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      team: nextProps.team,
    })
  }

  componentDidMount() {
    var that = this
    socket.on('finished', function(info) {
      var change = that.state.gameStatus
      if (info.team === that.state.team) {
        change -= 10
      }
      else {
        change += 10
      }

      var newBackground = info.prevBackground + 1
      if (newBackground > 5 || newBackground < 2) {
        newBackground = 2
      }

      that.setState({
        backgroundNumber: newBackground,
        gameStatus: change

      })
    })

  }

  togglePopup(event) {
    console.log("got here");
    var popup = document.getElementsByClassName("myPopup")[0];
    popup.classList.toggle("show");
  }

  render() {
    var game
    if (this.state.show) {
      game = <CssComponent team={this.state.team} id="gameView"></CssComponent>
    }
    else {
      game = <FrogComponent team={this.state.team} backgroundNumber={this.state.backgroundNumber} id="gameView"></FrogComponent>
    }
    return (
      <div id="gameboard">
        <h1>Crack the Code</h1>
        <div id="progressBar">
          <span>Opponent</span><input type="range"  min="0" max="100" value={this.state.gameStatus}/> <span>Us</span>
        </div>
        {game}
        <button id="questionMark" onClick={this.togglePopup.bind(this)}>?</button>
        <div className="myPopup"><span id="popuptext">An explanations of the current puzzle will be displayed here.
        The purpose of this is to provide hints to the players when needed and to understand the solutions of the puzzle at the end.</span></div>
      </div>
    )
  }
}
//
//<CssComponent id="gameView"></CssComponent>
//<img id="gameView" src='/img/Froggy1.png'/>

export default Gameboard
