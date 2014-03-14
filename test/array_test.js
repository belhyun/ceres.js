/*
console.log(ceres.A.reduce([1,2,3],function(a,b){return a+b}, 0));
console.log(ceres.A.reduce({a:1,b:2,c:3},function(a,b){return a+b}, 0));
console.log(ceres.A.initial([1,2,3],2));
console.log(ceres.A.initial([1,2,3]));
console.log(ceres.A.filter([1,2,3],function(n){return n > 2;}));
console.log(ceres.A.filter({a:1,b:2,c:3},function(n){return n > 2;}));
console.log(ceres.A.every([true, 1, null, 'yes'], function(v){if(v===true) return true; return false;}));
console.log(ceres.A.every([true,true], function(v){if(v===true) return true; return false;}));
console.log(ceres.A.include([1,2,3],1));
console.log(ceres.A.invoke([[1,2],[3,2]],'sort')); 
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(ceres.A.pluck(stooges, 'name'));
var people = [{name:'kim',age:20},{name:'lee',age:40},{name:'park',age:15}];
var a = [20,40,50];
console.log(ceres.A.max(people,function(person){return person.age}));
console.log(ceres.A.max(a));
var people = [{name:'lee',age:40},{name:'kim',age:20},{name:'park',age:15}];
var a = [20,40,50];
console.log(ceres.A.min(people,function(person){return person.age}));
console.log(ceres.A.min(a));
console.log(ceres.A.shuffle([1,2,3,4,5]));
var sort = function(a,b){
  return a>b;
}
console.log(ceres.A.sort([5,3,4,1,2],sort));
*/
