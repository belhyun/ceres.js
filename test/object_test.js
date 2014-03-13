/*
console.log(ceres.O.not({}));
console.log(ceres.C.map([1,2,3],function(num){
  return num*3;
}));
console.log(ceres.C.map({one: 1, two:2}, function(v,k){
  return k+":"+v*3;
}));
console.log(ceres.O.extend({destination: 'destination'}, {source: 'source'}));
var src = {
  a:1,
  b:2
};
var dst = {};
console.log(ceres.O.mixin(src,dst));
var dom = document.createElement("button");
console.log(ceres.O.isNotElement(dom));
var source = {
  a:1,
  b:2
};
console.log(ceres.O.clone(source));
source = [1,2,3];
console.log(ceres.O.clone(source));
var source = {
  a:1,
  b:2,
  c:3
};
console.log(ceres.O.pick(source,['a','b']));
console.log(ceres.O.toQueryString(source));
var source = {
  a:1,
  b:2,
  c:3
};
console.log(ceres.O.omit(source, 'a'));
console.log(ceres.O.isEmpty({}));
*/
var a = {};
var b = {c:2};
console.log(ceres.O.memoize(a,b).c);
b.c = 3;
console.log(a.memo);
console.log(ceres.O.memoize(a,b).c);
