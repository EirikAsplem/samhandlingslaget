var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('userConnected', {msg: 'tempUser'});
  
  socket.on('message', function(msg) {
    console.log('message');
    io.emit('message', msg)
  })
  socket.on('typing', function(typer) {
    io.emit('typing', typer)
  })
});

http.listen(process.env.PORT || 3000);
