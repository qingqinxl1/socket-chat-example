var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.broadcast.emit('chat message', socket.id + '已经上线'); //广播是针对别的用户，可用于上线提醒
  socket.emit('chat message', 'hi～'); //用户打开后说hi

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    socket.emit('chat message', 'bye～'); //用户离开后说bye
    socket.broadcast.emit('chat message', socket.id + '已经下线'); //下线提醒
  });
});



http.listen(8080, function() {
  console.log('listening on *:8080');
});
