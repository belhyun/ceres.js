/*
ceres.P.validator.types.isValidPasswd = {
  isValid: function(value){
    if(/^[a-zA-Z\d]{6,14}$/.test(value)){
      return true;
    }
    return false;
  }
};
if(ceres.P.validator.isValid(['isValidPasswd'], "11111")){
  console.log(1);
}
var cmds = {
  cmd1: function(){console.log(1);},
  cmd2: function(){console.log(2);}
}
var macro = new ceres.P.cmdPattern.macro;
var maker = ceres.P.cmdPattern.maker;

macro.add(maker(cmds.cmd1));
macro.add(maker(cmds.cmd2));
macro.execute();
var Test = function(args){
  console.log(args);
};
console.log(ceres.P.factory.get(Test,0,1));
*/
var Test = function(a, b){
    this.a = a;
      this.b = b;
};
Test.prototype.log = function(){
    console.log(this.a);
};
var ins = ceres.P.factory.get(Test,'a', 'b');
ins.log();
