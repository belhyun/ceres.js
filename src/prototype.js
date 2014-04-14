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
  if($_.O.isUndefined(Function.prototype.bind)){
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  $_.B.extend($_.PROTO,{
    mix:mix
  });
}).call(this,ceres);
