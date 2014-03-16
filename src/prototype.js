(function($_) {
  $_.N.namespace("ceres.PROTO");
  var mix = function(fn, src){
    if(!$_.F.isFunction(fn) || !$_.O.isObject(src)){
      throw new TypeError();
    }
    $_.C.map(src, function(v, k){
      var pk = fn.prototype[k];
      if($_.O.isNull(pk) || $_.O.isUndefined(pk)){
        fn.prototype[k] = v;
      }else if($_.F.isFunction(pk) && $_.F.isFunction(v)){
        fn.prototype[k] = $_.F.compose(pk, v);
      }else {
        new TypeError();
      }
    });
  };
  $_.B.extend($_.PROTO,{
    mix:mix
  });
}).call(this,ceres);
