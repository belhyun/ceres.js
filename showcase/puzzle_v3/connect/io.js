exports.start = function(server){
  module = myModule.module({
    io:'socket.io',
    pool:'../db/index',
    ceres:'ceres.js',
    queryFormat:'../db/index'
  }), io = module.io, usernames = {}, pool = module.pool.pool, ceres = module.ceres.ceres, queryFormat = module.queryFormat.queryFormat;
  io = io.listen(server);
  io.sockets.on('connection', function(socket){
    socket.on('adduser', function(username){
      socket.username = username;usernames[username] = username;
      pool.getConnection(function(err, connection){
        connection.config.queryFormat = queryFormat;
        connection.query('select * from score where username= :username',{username:username}, function(err, rows, fields){
          ceres.F.curry(function(a){
            var l = io.sockets;
            if(a){
              l.emit.call(l,'joinGame',username, rows[0].score);
            }else{
              l.emit.call(l,'joinGame',username);
            }
          }, !ceres.O.isUndefined(rows) && rows.length == 1)();
        });
        ceres.F.once(function(){connection.release()})();
      });
    });
    socket.on('updateScore', function(score){
      pool.getConnection(function(err, connection){
        connection.config.queryFormat = queryFormat;
        connection.query('select * from score where username= :username',{username:socket.username}, function(err, rows, fields){
          if(rows.length == 0){
            connection.query('insert into score(username, score) values(:username, :score)', {username:socket.username,score:score}, function(err, rows, fields){
              if(err) throw err;
            });
          }else{
            ceres.F.before(function(r){
              if(r){
                connection.query('update score set score = :score where username = :username',{username:socket.username,score:score}, function(err, rows, fields){
                  if(err) throw err;
                });
              }
            },function(){
              return !ceres.O.isUndefined(rows) && rows[0].score < score?true:false;
            });
          }
          io.sockets.emit("updateScore",socket.username, score);
        });
        ceres.F.once(function(){connection.release()})();
      });
    });
  });
};
