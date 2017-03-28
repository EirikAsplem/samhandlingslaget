/**
 * Created by Daphne on 27.03.2017.
 */

import React, { Component } from 'react'

import styles from './letterContainer.css';

class LetterContainer extends Component {

    constructor() {
        super()
    }

    buttonHandler(event) {
    }

    inputHandler(event) {
        var regex = /^[a-zA-Z]+$/;
        if (event.target.value.match(regex) || event.target.value == "") {
                event.target.classList.remove('notLetter')
        }
        else {
                event.target.classList.add('notLetter');
        }
    }

    render() {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var letters = [];
        for (var i = 0; i < alphabet.length-1; i++) {
            letters.push(
                <div className="letterBox" key={'alphabet' + i}>
                    <div className="alphabetLetter"><p>{alphabet.charAt(i)}</p></div>
                    <div className="cryptedLetter">
                        <input id="input" onChange={this.inputHandler.bind(this)} maxLength="1"/>
                    </div>
                </div>);
        }

        return (
            <div className="letterContainer">
                <div className="letters">
                    {letters}
                </div>
                <button onClick={this.buttonHandler.bind(this)}>Try</button>
            </div>
        )
    }
}

export default LetterContainer
