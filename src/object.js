(function($_){
  $_.N.namespace("ceres.O");
  var each = $_.C.each;
  var map = $_.C.map;
  var curry = $_.F.curry;
  var compose = $_.F.compose;
  var not = curry(function(operator,operand){return operator.call(this,operand);}, $_.B.op["!"]);
  var extend = _.extend;
  var isObject = _.isObject;
  var mixin = function(obj, mixin){
    if(!isObject(obj) || !isObject(mixin)){
      return new TypeError;
    } 
    map(obj, function(v,k){
      mixin[k] = v;
    });
    return mixin;
  };
  var isEqual = _.isEqual;
  var isEmpty = _.isEmpty;
  var take = function take(fn, times, base){
    if(times <= 1){
      return fn(base);
    }
    return fn(take(fn, times-1, base));
  };

  $_.O.not = not;
  $_.O.extend = extend;
  $_.O.isObject = isObject;
  $_.O.isEqual = isEqual;
  $_.O.isEmpty = isEmpty;
  $_.O.mixin = mixin;
  $_.O.take = take;
}).call(this,ceres);
