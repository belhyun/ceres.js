var ceres  = ceres || {};
(function($_){
  $_.N = {};
  $_.N.namespace = function(ns_string){
    var parts = ns_string.split('.'), parent = $_, i;
    if(parts[0] == "ceres"){
      parts = parts.slice(1);
    }
    for(i=0; i< parts.length; i++){
      if(typeof parent[parts[i]] === "undefined"){
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }
    return parent;
  };
}).call(this, ceres);
