import React from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/chat'
import './client.css'
import Gameboard from './components/gameboard'
import LetterContainer from './components/letterContainer'

import TempDebugForTeam from './components/tempDebugForTeam'


ReactDOM.render(
	<div id="game">
		<TempDebugForTeam></TempDebugForTeam>
  </div>,
  document.getElementById('root')
);
