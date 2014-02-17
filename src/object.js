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
  var take = function take(fn, times, base){
    if(times <= 1){
      return fn(base);
    }
    return fn(take(fn, times-1, base));
  };
  var isElement = _.isElement;
  var isNotElement = function(dom){
    return not(isElement(dom));
  };
  var isArray = _.isArray;
  var clone = function(obj){
    if(!isObject(obj)) throw new TypeError;
    if(isArray(obj) || isObject(obj)){
      return isArray(obj) ? obj.slice() : _.clone(obj);
    }
  };
  var pick = function(obj, keys){
    if(!isArray(keys) || !isObject(obj)){
      return new TypeError;
    }
    return _.pick(obj, keys);
  };

  extend($_.O,{
    not: not,
    extend: extend,
    isObject: isObject,
    mixin: mixin,
    take: take,
    isElement: isElement,
    isNotElement: isNotElement,
    isArray: isArray,
    clone: clone,
    pick: pick
  });
}).call(this,ceres);
