var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('public'));

io.allClients = []
io.on('connection', function(socket){
  console.log('New connection')
  console.log(io.allClients.length)
  io.allClients[socket.id] = {id: '',
                              name: '',
                              team: false,
                              map: ''
                            }
  io.allClients[socket.id].id = socket.id
  var data = []
  for (var key in io.allClients) {
    var obj = {id: io.allClients[key].id,
              name: io.allClients[key].name,
              team: io.allClients[key].team,
              map: io.allClients[key].map
            }
    data.push(obj)
  }
  io.emit('usersConnected', {msg: data})

  socket.on('message', function(msg) {
    console.log('message')
    io.emit('message', msg)
  })

  socket.on('updatePlayerInfo', function(msg) {
    io.allClients[socket.id].name = msg.name
    io.allClients[socket.id].team = msg.team
    io.allClients[socket.id].map = msg.map
    console.log(msg.team);
    var data = []
    for (var key in io.allClients) {
      var obj = {id: io.allClients[key].id,
                name: io.allClients[key].name,
                team: io.allClients[key].team,
                map: io.allClients[key].map
              }
      data.push(obj)
    }
    io.emit('usersConnected', {msg: data})
  })

  socket.on('disconnect', function() {
    delete io.allClients[socket.id]
    console.log('User disconnected: ' + socket.id)
  })

  socket.on('typing', function(typer) {
    socket.broadcast.emit('typing', typer)
  })

  socket.on('codeInput', function(text) {
    io.emit('codeInput', text)
  })

  socket.on('finished', function(info) {
    io.emit('finished', info)
  })
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Server listening')
});
