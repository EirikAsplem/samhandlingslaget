import React, { Component } from 'react'
import './gameboard.css'
import './slider.css'
import './popup.css'

class Gameboard extends Component {

  togglePopup(event) {
    console.log("got here");
    var popup = document.getElementsByClassName("myPopup")[0];
    popup.classList.toggle("show");
  }

  render() {
    
    return (
      <div id="gameboard">
        <h1>Crack the Code</h1>
        <div id="progressBar">
          <span>Opponent</span><input type="range"  min="0" max="100"/> <span>Us</span>
        </div>
        <img id="gameView" src='/img/Froggy1.png'/>
        <button id="questionMark" onClick={this.togglePopup.bind(this)}>?</button>
        <div className="myPopup"><span id="popuptext">An explanations of the current puzzle will be displayed here. 
        The purpose of this is to provide hints to the players when needed and to understand the solutions of the puzzle at the end.</span></div>
      </div>
    )
  }
}

export default Gameboard