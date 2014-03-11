var io = require('socket.io');
io.sockets.on('connection', function(socket){
  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    io.sockets.emit('joinGame',username);
  });

  socket.on('updateScore', function(score){
    io.sockets.emit("updateScore",socket.username, score);
  });
});
