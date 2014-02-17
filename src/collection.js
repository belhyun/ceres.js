(function($_){
  $_.N.namespace("ceres.C");
  var each = _.each;
  var map = _.map;
  var iterate = function(fn, base){
    return function(init){
      init = (init == null)? base: init;
      base = fn.call(this, init);
      return init;
    }
  };
  $_.C.each = each;
  $_.C.map = map;
  $_.C.iterate = iterate;
}).call(this,ceres);
