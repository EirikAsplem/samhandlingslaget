import React from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/chat'
import './client.css'
import Gameboard from './components/gameboard'
import LetterContainer from './components/letterContainer'


ReactDOM.render(
	<div id="game">
		<Gameboard></Gameboard>
		<div id="communication-div">
			<Chat id="communication-chat"></Chat>
			<LetterContainer id="letter-container"></LetterContainer>
		</div>
  </div>,
  document.getElementById('root')
);
