import React, { Component } from 'react'
const io = require('socket.io-client')
const socket = io()

import styles from './cssComponent.css'

class CssComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      team: props.team,
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    document.getElementById("code").value = ""
  }

  buttonHandler(event) {
    var text = this.refs.codeInput1.value;
    var codeLines = text.replace(/(\r\n)|\r|\n/g, '\n').split(/\n+/g)
    var codeEmit = ["", ""]
    for (var i = 0; i < codeLines.length; i++) {
      if (codeLines[i].indexOf("justify") != -1) {
        codeEmit[0] = codeLines[i]
      }
      else if (codeLines[i].indexOf("align") != -1) {
        codeEmit[1] = codeLines[i]
      }
    }
    socket.emit('codeInput', {code1: codeEmit[0], code2: codeEmit[1], team: this.state.team});
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
          <textarea rows="2" ref="codeInput1" id="code" autofocus></textarea>
          <pre id="after">{rightCurly}</pre>
        </div>
        <button id="next" className="translate" onClick={this.buttonHandler.bind(this)}>Send</button>
      </div>
    )
  }
}

export default CssComponent
