(function($_){
  $_.N.namespace("ceres.CK");
  var set = function(key, val, expireTime, maxAge){
    var cookieOpt = { 
      '': val,
      'path': '/' 
    };  
    if(!$_.O.isNull(expireTime)){   
      try{   
        var dt = new Date();
        var unixTime = Math.ceil(dt.getTime() / 1000);
        dt.setTime((unixTime + expireTime) * 1000);
        cookieOpt['expires'] = dt.toUTCString();
      }   
      catch(e){
        throw new Error();
      }
    }   
    if(maxAge >= 0){
      cookieOpt['max-age'] = maxAge;
    }
    document.cookie = key + ceres.S.join(cookieOpt, '=', ';');
  };

  var get = function(searchKey){
    var dc = document.cookie, arrDc = dc.split(';'), res, obj={};
    $_.C.map(arrDc, function(v, k){
      var kval = $_.S.trim(v).split('=');
      if($_.B.op["equals"](kval[0],searchKey)){
        obj[kval[0]] = kval[1];
      }
    });
    if(!$_.O.isNull(res = $_.O.pick(obj,[searchKey]))){
      return res[searchKey];
    }
    return null;
  };
  var del = function(key){
    set(key, '', 0);
  }
  $_.B.extend($_.CK,{
    set: set,
    get: get,
    del: del
  });
}).call(this,ceres);
