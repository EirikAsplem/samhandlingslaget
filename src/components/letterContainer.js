/**
 * Created by Daphne on 27.03.2017.
 */

import React, { Component } from 'react'

import styles from './letterContainer.css';

class LetterContainer extends Component {

    constructor() {
        super();
        this.state = {
            map:{a: '', b: '', c: '',
                 d: '', e: '', f: '',
                 g: '', h: '', i: '',
                 j: '', k: '', l: '',
                 m: '', n: '', o: '',
                 p: '', q: '', r: '',
                 s: '', t: '', u: '',
                 v: '', w: '', x: '',
                 y: '', z: ''}
        }

    }

    buttonHandler(event) {
    }

    inputHandler(event) {
        var regex = /^[a-zA-Z]+$/;
        if (event.target.value.match(regex) || event.target.value == "") {
                event.target.classList.remove('notLetter');
                var temp = this.state.map
                temp[event.target.getAttribute("id").toLowerCase()] = event.target.value
                this.setState({map: temp})
        }
        else {
                event.target.classList.add('notLetter');
        }
    }

    render() {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var letters = [];
        for (var i = 0; i < alphabet.length; i++) {
            letters.push(
                <div className="letterBox" key={"" + i}>
                    <div className="alphabetLetter"><p>{alphabet.charAt(i)}</p></div>
                    <div className="cryptedLetter">
                        <input id={"" + alphabet.charAt(i)} className="input" onChange={this.inputHandler.bind(this)} maxLength="1"/>
                    </div>
                </div>);
        }

        return (
            <div className="letterContainer">
                <div className="letters">
                    {letters}
                </div>
                <button className="button" onClick={this.buttonHandler.bind(this)}>Try</button>
            </div>
        )
    }
}

export default LetterContainer
