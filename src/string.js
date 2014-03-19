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
  var succ = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.slice(0, str.length-1)+String.fromCharCode(str.charCodeAt(str.length-1)+1);
  };
  var camelize = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.replace(/[-|_]+(.)?/g, function(match,chr){
      return chr ? chr.toUpperCase():'';
    });
  };
  var underscored = function(str){
    if(!$_.O.isString(str)) throw new TypeError();
    return str.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
              .replace(/([a-z\d])([A-Z])/g, '$1_$2')
              .replace(/-/g, '_')
              .toLowerCase();
  };

  $_.B.extend($_.S,{
    isEmpty: isEmpty,
    truncate: truncate,
    join: join,
    trim: trim,
    stripTags: stripTags,
    escapeHtml: escapeHtml,
    unescapeHtml: unescapeHtml,
    toArray: toArray,
    succ: succ,
    camelize: camelize,
    underscored: underscored
  });
}).call(this,ceres);

