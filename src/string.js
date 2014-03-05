(function($_){
  $_.N.namespace("ceres.S");
  var isEmpty = function(v){
    return (!v || 0 === v.length);
  };
  $_.B.extend($_.S,{
    isEmpty: isEmpty
  });
}).call(this,ceres);

