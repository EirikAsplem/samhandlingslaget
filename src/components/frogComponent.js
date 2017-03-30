import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import styles from './frogComponent.css'

class FrogComponent extends Component {

  componentDidMount() {
    socket.on('codeInput', function(text) {
      console.log(text);
    })
  }

  render() {

    const frogStyle = {
      backgroundImage: 'url(/img/frog-green.png)',
    }

    const lilyStyle = {
      backgroundImage: 'url(/img/lilypad-green.png)',
    }

    return (
        <div id="pond">
          <div className="frog green" style={frogStyle}>
          </div>
          <div className="lilypad green" style={lilyStyle}>
          </div>
        </div>
    )
  }
}

export default FrogComponent
