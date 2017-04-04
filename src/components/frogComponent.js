import React, { Component } from 'react'

import styles from './frogComponent.css'

class FrogComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      team: props.team,
      backgroundNumber: props.backgroundNumber //2,3,4,5
    }
  }

/*
  2: justify-content: flex-end;
  3:justify-content:flex-end;
    align-items:flex-end;
  4: align-items: flex-end;
  5:justify-content: center;
    align-items: center;

*/
  componentWillReceiveProps(nextProps) {
    document.getElementById('pond').style.justifyContent = "flex-start"
    document.getElementById('pond').style.alignItems = "flex-start"
    this.setState({
      team: nextProps.team,
      backgroundNumber: nextProps.backgroundNumber
    })
  }

  componentDidMount() {
    var that = this
    var socket = this.props.data
    socket.on('codeInput', function(text) {
      console.log(text.code1);
      console.log(text.code2);
      if (that.state.team === text.team) {
        if (text.code1 === "justify-content: flex-end;" && text.code2 === "") {
          document.getElementById('pond').style.justifyContent = "flex-end"
          if (that.state.backgroundNumber === 2) {
            socket.emit('finished', {team: that.state.team, prevBackground: that.state.backgroundNumber})
          }
        }
        else if (text.code1 === "justify-content: flex-end;" && text.code2 === "align-items: flex-end;") {
          document.getElementById('pond').style.justifyContent = "flex-end"
          document.getElementById('pond').style.alignItems = "flex-end"
          if (that.state.backgroundNumber === 3) {
            socket.emit('finished', {team: that.state.team, prevBackground: that.state.backgroundNumber})
          }
        }
        else if (text.code2 === "align-items: flex-end;" && text.code1 === "") {
          document.getElementById('pond').style.alignItems = "flex-end"
          if (that.state.backgroundNumber === 4) {
            socket.emit('finished', {team: that.state.team, prevBackground: that.state.backgroundNumber})
          }
        }
        else if (text.code1 === "justify-content: center;" && text.code2 === "align-items: center;") {
          document.getElementById('pond').style.justifyContent = "center"
          document.getElementById('pond').style.alignItems = "center"
          if (that.state.backgroundNumber === 5) {
            socket.emit('finished', {team: that.state.team, prevBackground: that.state.backgroundNumber})
          }
        }
      }
    })
  }

  render() {
    var backgroundUrl = 'url(/img/lilypad-background-'+ this.state.backgroundNumber + '.png)'
    const frogStyle = {
      backgroundImage: 'url(/img/froggy-green-1.png)',
    }

    const lilyStyle = {
      backgroundImage: backgroundUrl,
    }

    return (
        <div id="pond" style={lilyStyle}>
          <div className="frog green" style={frogStyle}>
          </div>
        </div>
    )
  }
}
export default FrogComponent
