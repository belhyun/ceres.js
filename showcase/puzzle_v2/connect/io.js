exports.start = function(server){
  var io = require('socket.io'), usernames = {};
  var connection = require('../db/index').connection;
  io = io.listen(server);
  io.sockets.on('connection', function(socket){
  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    connection.query('select * from score where username=?',username, function(err, rows, fields){
      if(typeof rows !== 'undefined' && rows.length == 1){
        io.sockets.emit('joinGame',username, rows[0].score);
      }else{
        io.sockets.emit('joinGame',username);
      }
    });
  });

  socket.on('updateScore', function(score){
    var data = {score:score, username:socket.username};
    connection.query('select * from score where username=?',socket.username, function(err, rows, fields){
      if(rows.length == 0){
        connection.query('insert into score set ?', data, function(err, rows, fields){
          if(err) throw err;
        });
      }else{
        if(typeof rows !== 'undefined' && rows[0].score < score){
          connection.query('update score set score = ? where username = ?',[score,socket.username], function(err, rows, fields){
            if(err) throw err;
          });
        }
      }
      connection.end();
      io.sockets.emit("updateScore",socket.username, score);
    });
  });
});
};
