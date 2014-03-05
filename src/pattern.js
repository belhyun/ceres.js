(function($_){
  $_.N.namespace("ceres.P");
  var validator = {
    types: {},
    isValid: function(types, data){
      var cnt = 0;
      for(var i=0; i<types.length; i++){
        checker = this.types[types[i]];
        if(checker.isValid.call(checker,data)){
          cnt++;
        }
      }
      if(types.length == cnt){
        return true;
      }
      return false;
    }
  }

  var Cmd = function(arg){
    this.arg = arg;
  };
  Cmd.prototype.execute = function(){
    this.action.call(this, this.arg);
  };
  var maker = function(method, arg){
    var c = function(){
      Cmd.call(this,arg);
    };
    c.prototype = new Cmd;
    c.prototype.action = method;
    return new c;
  };
  function Macro(){
    this.cmds = [];
  }
  Macro.prototype = new Cmd;
  Macro.prototype.add = function(cmd){
    this.cmds.push(cmd);
  };
  Macro.prototype.execute = function(){
    for(var i=0;i<this.cmds.length;i++){
      this.cmds[i].execute.call(this.cmds[i]);
    }
    this.cmds = [];
  };
  var cmdPattern = {
    maker: maker,
    macro: Macro,
    cmd: Cmd
  };
  $_.B.extend($_.P,{
    validator: validator,
    cmdPattern: cmdPattern
  });

}).call(this,ceres);
