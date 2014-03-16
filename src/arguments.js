(function($_) {
  $_.N.namespace("ceres.AR");
  var toArray = function(){
    return $_.A.toArray(arguments);
  };
  $_.B.extend($_.AR,{
    toArray: toArray
  });

})(ceres);
