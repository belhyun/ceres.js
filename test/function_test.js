/*
var func = function(){
  return this.name +" "+ arguments[0][0] + " " +arguments[0][1];
};
func = ceres.F.bind(func, {name: 'moe'}, 'hi' , 'i love you');
console.log(func());
var source = function(a){
  return -a;
};
console.log(ceres.F.wrap(source, function(fn, a){
  return -fn(a);
})(2));
var pre = function(){
  console.log('pre');
};
var after = function(a){
  console.log('after');
};
ceres.F.before(after, pre)();
*/
var after = function(a){
  return -a;
};
var before = function(){
  return -1;
};
console.log(ceres.F.after(before, after)());

