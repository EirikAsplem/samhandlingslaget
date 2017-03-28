import React from 'react';
import ReactDOM from 'react-dom';

import Chat from './components/chat'
import './client.css'
import Gameboard from './components/gameboard'

ReactDOM.render(
	<div id="game">
	<Gameboard></Gameboard>
	<div id="communication-div">
		<Chat></Chat>
		<div id="Temp">Temp. Waiting for encryption
		</div>
	</div>
  </div>,
  document.getElementById('root')
);
