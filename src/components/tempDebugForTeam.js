import React, { Component } from 'react'

import Chat from './chat'
//import '../client.css'
import Gameboard from './gameboard'
import LetterContainer from './letterContainer'

class TempDebugForTeam extends Component {

  constructor() {
    super()

    this.state = {
      show: true,
      team: false
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

  render() {
    return (
      <div id="debug-div">


        <button className="DebugButton" onClick={this.teamHandler.bind(this)}>Team: {this.state.team.toString()}</button>
        <button className="DebugButton" onClick={this.debugHandler.bind(this)}>Debug</button>

        <Gameboard show={this.state.show} team={this.state.team}></Gameboard>
        <div id="communication-div">
          <Chat team={this.state.team} id="communication-chat"></Chat>
          <LetterContainer id="letter-container"></LetterContainer>
        </div>
      </div>
    )
  }
}

export default TempDebugForTeam
