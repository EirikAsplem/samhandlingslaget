var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('public'));

io.allClients = []
io.on('connection', function(socket){
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

  //Her må det sendes til rett person.
  socket.on('codeInput', function(text) {
    io.emit('codeInput', text);
/*    console.log(io.allClients.length);
    var team = io.allClients[socket.id].team
    console.log(team);
    for (var key in io.allClients) {
      console.log(io.allClients[key].team);
      if (io.allClients[key].team === team && io.allClients[socket.id] != io.allClients[key].id) {
        io.to(io.allClients[key].id).emit('codeInput', text);
      }
    }*/
  })
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Server listening')
});
