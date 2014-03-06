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
var after = function(a){
  return -a;
};
var before = function(){
  return -1;
};
console.log(ceres.F.after(before, after)());
var obj = {name: 'lee'};
var obj2 = {name: 'kim'};
function getName(obj){
  return obj.name;
}
obj.getName = ceres.F.methodize(getName);
console.log(obj.getName());
console.log(ceres.F.now());
var once = ceres.F.once(function(){console.log(1)});
once();
once();
var fn1 = function(){
  return true;
};
var fn2 = function(){
  return false;
};
console.log(ceres.F.or(fn1,fn2));
console.log(ceres.F.and(fn1,fn2));
*/
var obj = {
  label: 'ceres.js',
  fn1: function(){console.log(this.label)}
};
obj.fn1.call(this);
ceres.F.bindAll(obj,'fn1');
obj.fn1.call(this);

