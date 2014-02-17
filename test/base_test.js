/*
(function($_){
  //console.log($_.C.op["mask"](1,2));
  $_.C.iterate(function(base){
    $_.C.each(base,function(v){
      //console.log(v);
    });
  },base = {a:1,b:2})();
}).call(this,ceres);
var result = ceres.F.memoize(function(n){
  return n*n/n+n-n*n;
},function(){
  return _.random(0,100);
});
console.log(result(5));
console.log(result(7));
var cnt = 0;
ceres.O.take(function(base){
  console.log(cnt++);
  console.log(base);
},5,{a:1,b:2,c:3});
var greet    = function(name){ return "hi: " + name; };
var exclaim  = function(statement){ return statement.toUpperCase() + "!"; };
var welcome = ceres.F.compose(greet, exclaim);
console.log(welcome('moe'));
var add = function(a,b){return a+b};
var add2 = ceres.F.curry(add,2);
console.log(add2(5));
var add_all = function(){
  var args = Array.prototype.slice.call(arguments,0);
  return args.reduce(function(p, c){
    return p+c;
  });
};
var partial_add = ceres.F.partial(add_all, undefined, undefined, 5);
console.log(partial_add(2,3));
ceres.F.extract(function(){
  console.log(arguments);
},1)(1,2,3);
*/
