import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import styles from './cssComponent.css'

class CssComponent extends Component {

  buttonHandler(event) {
    var text = this.refs.codeInput.value;
    socket.emit('codeInput', text);
  }

  render() {
    var leftCurly = "{"
    var rightCurly = "}"
    return (
      <div id="editor">
        <div id="css">
          <div className="line-numbers">
            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10
          </div>

          <pre id="before">#pond{leftCurly} <br/>  display:flex;</pre>
          <textarea ref="codeInput" id="code" autofocus></textarea>
          <pre id="after">{rightCurly}</pre>
        </div>
        <button id="next" className="translate" onClick={this.buttonHandler.bind(this)}>Send</button>
      </div>
    )
  }
}

export default CssComponent
