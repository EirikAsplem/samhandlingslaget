import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import styles from './frogComponent.css'

class FrogComponent extends Component {

  componentDidMount() {
    socket.on('codeInput', function(text) {
      if (text === "justify-content: flex-end;") {
        document.getElementById('pond').style.justifyContent = "flex-end"
      }
    })
  }

  render() {

    const frogStyle = {
      backgroundImage: 'url(/img/froggy-green-1.png)',
    }

    const lilyStyle = {
      backgroundImage: 'url(/img/lilypad-background-2.png)',
    }

    return (
        <div id="pond" style={lilyStyle}>
          <div className="frog green" style={frogStyle}>
          </div>
        </div>
    )
  }
}
//          <div className="lilypad green" style={lilyStyle}>
// </div>
export default FrogComponent
