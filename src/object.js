(function($_){
  $_.N.namespace("ceres.O");
  var nativeEncode = encodeURIComponent;
  var each = $_.C.each;
  var map = $_.C.map;
  var curry = $_.F.curry;
  var compose = $_.F.compose;
  var not = curry(function(operator,operand){return operator.call(this,operand);}, $_.B.op["!"]);
  var isObject = _.isObject;
  var isUndefined = _.isUndefined;
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

  var toQueryString = function(obj){
    var res = [];
    if(!isObject(obj)){
      throw new TypeError();
    }
    function toQueryPair(k, v){
      key = nativeEncode(k);
      if(isUndefined(v)){
        return k;
      }
      return k + '=' + nativeEncode(v);
    }
    map(obj, function(v,k){
      res.push(toQueryPair(k, v));
    });
    
    return res.join('&');
  };

  var omit = function(obj, keys){
    if(!isObject(obj) || isUndefined(keys)){
      throw new TypeError;
    }
    return _.omit(obj, keys);
  };
  var isNull = _.isNull;

  $_.B.extend($_.O,{
    not: not,
    isObject: isObject,
    mixin: mixin,
    take: take,
    isElement: isElement,
    isNotElement: isNotElement,
    isUndefined: isUndefined,
    isArray: isArray,
    clone: clone,
    pick: pick,
    toQueryString: toQueryString,
    omit: omit,
    isNull:isNull
  });
}).call(this,ceres);
