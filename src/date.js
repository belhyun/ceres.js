(function($_) {
  $_.N.namespace("ceres.D");
  var getToMNTimestamp = function(){
    var currentDate = new Date();
    var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
    return toTimestamp(expirationDate.getTime() - currentDate.getTime());
  };

  var toTimestamp = function(time){
    if(!_.isNumber(time)) throw new TypeError();
    return Math.floor(time/1000);
  };
  $_.B.extend($_.D,{
    getToMNTimestamp: getToMNTimestamp,
    toTimestamp: toTimestamp
  });
})(ceres);
