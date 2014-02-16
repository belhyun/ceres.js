(function($_){
  $_.N.namespace("ceres.O");
  var objProto = Object.prototype, ArrayProto = Array.prototype;
  nativeToString = objProto.toString,
  hasOwnProperty = objProto.hasOwnProperty, slice = ArrayProto.slice;

  var curry = $_.C.combine.curry;
  var compose = $_.C.behavior.compose;
  var not = curry(function(operator,operand){return operator.call(this,operand);}, $_.C.op["!"]);
  var extend = _.extend;
  var mixin;
    
  $_.O.not = not;
  $_.O.extend = extend;
}).call(this,ceres);
