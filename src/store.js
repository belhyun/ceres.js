(function($_){
  $_.N.namespace("ceres.STORE");
  var cache = {};
  var getStore = function(options){
    options = options || {};
    var get = function(k){
      var res;
      if(has(k)){
        res = cache[k];
        return res;
      }
    };
    var has = function(k){
      return !!cache[k];
    };
    var set = function(k,v){
      cache[k] = v;
    };
    var remove = function(k){
      delete cache[k];
    };

    return {
      get:get,
      set:set,
      has:has,
      remove:remove
    };
  };
  $_.B.extend($_.STORE, {
    getStore:getStore
  });
}).call(this,ceres);
