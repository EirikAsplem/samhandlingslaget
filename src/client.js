import React from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/chat'
import './client.css'
import Gameboard from './components/gameboard'

ReactDOM.render(
	<div id="game">
	<Gameboard></Gameboard>
  <Chat></Chat>
  </div>,
  document.getElementById('root')
);
