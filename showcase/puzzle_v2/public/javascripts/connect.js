(function($_){
  var socket = io.connect("http://14.63.198.222:3000");
  socket.on('connect',function(){
    socket.emit('adduser', prompt("what's your name?"));
    socket.on('joinGame', function(username, score){
      if(typeof score !== 'undefined'){
        $("#log ul").append("<li>"+username+"님 참가& 최고점수 = "+score+"</li>");
      }else{
        $("#log ul").append("<li>"+username+"님 참가</li>");
      }
    });
    setTimeout(function(){
      socket.emit('updateScore', $_.score);
    },60000);
    socket.on('updateScore',function(username,score){
      $("#log ul").append("<li>"+username+"님이 "+score+"개의 퍼즐을 맞추는데 성공!"+"</li>");
    });
  });
}).call(this,window);
