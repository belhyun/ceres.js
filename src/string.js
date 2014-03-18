(function($_){
  $_.N.namespace("ceres.S");
  var isEmpty = function(v){
    if(!$_.O.isString(v)){
      throw new TypeError();
    }
    return (!v || 0 === v.length);
  };
  var truncate = function(str, length, truncation){
    if(!$_.O.isString(str)){
      throw new TypeError();
    }
    length = length || 30;
    truncation = $_.O.isUndefined(truncation)?'...':truncation;
    return str.length > length ? str.slice(0, length) + truncation : String(str);
  };
  var join = function(obj, d, s){
    var arrStr = [];
    if(!$_.O.isObject(obj)){
      throw new TypeError;
    } 
    $_.C.map(obj, function(v, k){
      arrStr.push(k + d + v);
    });
    return arrStr.join(s);
  };
  var trim = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
  };
  var stripTags = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  };
  var escapeHtml = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  };
  var unescapeHtml = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return stripTags(str).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  };
  var toArray = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.split('');
  };
  $_.B.extend($_.S,{
    isEmpty: isEmpty,
    truncate: truncate,
    join: join,
    trim: trim,
    stripTags: stripTags,
    escapeHtml: escapeHtml,
    unescapeHtml: unescapeHtml,
    toArray: toArray
  });
}).call(this,ceres);

