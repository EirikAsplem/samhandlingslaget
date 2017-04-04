import React, { Component } from 'react'

import Chat from './chat'
import Gameboard from './gameboard'
import LetterContainer from './letterContainer'
const io = require('socket.io-client')
const socket = io()
const Cipher = require('../cipher')

class TempDebugForTeam extends Component {

  constructor() {
    super()
    this.cipher = window.Cipher
    this.state = {
      show: true,
      team: false,
      enemyMap: []
    }
  }

  debugHandler(event) {
    var temp = !this.state.show
    this.setState({show: temp})
  }

  teamHandler(event) {
    var temp = !this.state.team
    this.setState({team: temp})
  }

  handleEnemyMap(map) {
    this.setState({enemyMap: map})
  }

  render() {
    return (
      <div id="debug-div">


        <button className="DebugButton" onClick={this.teamHandler.bind(this)}>Team: {this.state.team.toString()}</button>
        <button className="DebugButton" onClick={this.debugHandler.bind(this)}>Debug</button>

        <Gameboard show={this.state.show} team={this.state.team} data={socket}></Gameboard>
        <div id="communication-div">
          <Chat team={this.state.team} id="communication-chat" Cipher={this.cipher} data={socket} enemyMap={this.state.enemyMap}></Chat>
          <LetterContainer id="letter-container" Cipher={this.cipher} enemyMapHandler={this.handleEnemyMap.bind(this)}></LetterContainer>
        </div>
      </div>
    )
  }
}

export default TempDebugForTeam
