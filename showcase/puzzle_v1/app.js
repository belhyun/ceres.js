
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ceres = require('ceres.js').ceres;
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'whdgus2',
  database : 'study'
});
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'whdgus2',
  database: 'study'
});

var app = express(), io = require('socket.io'), server, usernames = {};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
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
      io.sockets.emit("updateScore",socket.username, score);
    });
  });
});
