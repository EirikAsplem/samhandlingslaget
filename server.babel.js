var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('public'));

var allClients = []
var pendulum = false
io.on('connection', function(socket){
  allClients.push(socket)
  console.log('User connected: ' + socket.id)
  io.emit('usersConnected', {msg: Object.keys(io.sockets.sockets)})

  socket.on('newPlayer', function (msg) {
    console.log('newPlayer')
    socket.player = msg.player
    socket.team = msg.team
    io.emit('newPlayer', msg)
  })

  socket.on('myName', function(msg) {
    socket.broadcast.emit('myName', {id: socket.id, name: msg.msg, team: msg.team, map: msg.map})
  })

  socket.on('message', function(msg) {
    console.log('message')
    io.emit('message', msg)
  })

  socket.on('disconnect', function() {
    console.log('User disconnected: ' + socket.id)
    socket.broadcast.emit('userDisconnected', {id: socket.id})
  })

  socket.on('typing', function(typer) {
    socket.broadcast.emit('typing', typer)
  })

  //Her må det sendes til rett person.
  socket.on('codeInput', function(text) {
    io.emit('codeInput', text)
  })
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Server listening')
});
