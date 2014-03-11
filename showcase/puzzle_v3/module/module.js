exports.module = function(obj){
  var ceres = require('ceres.js').ceres;
  ceres.C.map(obj, function(v,k){
    obj[k] = require(v);
  });
  return obj;
};
