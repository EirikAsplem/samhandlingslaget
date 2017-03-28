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
  //socket.set('userTeam', pendulum)
  pendulum = !pendulum
  io.emit('usersConnected', {msg: Object.keys(io.sockets.sockets)})

  socket.on('newPlayer', function (msg) {
    console.log('newPlayer')
    io.emit('newPlayer', msg)
  })

  socket.on('message', function(msg) {
    console.log('message')
    io.emit('message', msg)
  })

  socket.on('disconnect', function() {
    console.log('User disconnected: ' + socket.id)
    socket.broadcast.emit('usersConnected', {msg: Object.keys(io.sockets.sockets)})
  })


});

http.listen(process.env.PORT || 3000, function() {
  console.log('Server listening')
});
