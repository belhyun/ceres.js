var ceres  = ceres || {};
_ = require('underscore');
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
(function($_){
  $_.N.namespace("ceres.B");
  var op = {
    "+": function(a,b){
      return a+b;
    },
    "-": function(a, b){
      return a-b;
    },
    "*": function(a, b){
      return a*b;
    },
    "/": function(a, b){
      if(b === 0) throw new TypeError();
      return a/b;
    },
    "%": function(a, b){
      if(b === 0) throw new TypeError();
      return a%b;
    },
    "==": function(a, b){
      return a==b;
    },
    "===": function(a, b){
      return a===b;
    },
    "equals": function equals(a, b){
     return  _.isEqual(a,b)
    },
    "!": function(a){
      return !a;
    },
    "&&": function(a, b){
      return a&&b;
    },
    "||": function(a, b){
      return a||b;
    },
    "inc": function(a){
      return ++a;
    },
    "desc": function(a){
      return --a;
    },
    "mask": function(a, b){
      return a|b;
    }
  };
  var extend = _.extend;
  $_.B.op = op;
  $_.B.extend = extend;
}).call(this,ceres);

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
(function($_){
  $_.N.namespace("ceres.A");
  var union = _.union, nativeReduce = Array.prototype.reduce, each = $_.C.each,
  map = $_.C.map, nativeFilter = Array.prototype.filter, nativeEntry = Array.prototype.every, nativeIndexOf = Array.prototype.indexOf
  ,nativeSlice = Array.prototype.slice;
  var reduce = function(col, iterator, memo, context){
    var initial = arguments.length > 2;
    if($_.O.isNull(col == null)){
      throw new TypeError();
    }
    if(nativeReduce && _.isEqual(col.reduce, nativeReduce)){
      if(context){
        iterator = $_.F.bind(iterator, context);
      } 
      return initial? col.reduce(iterator, memo) : col.reduce(iterator);
    }
    map(col, function(v,k){
      if(!initial){
        memo = v;
        initial = true;
      }else{
        memo = iterator.call(context, memo, v);
      }
    });
    return memo;
  };
  var first = _.first;
  var merge = union;
  var last = _.last;
  var initial = _.initial;
  var filter = function(col, iterator, context){
    var results = [];
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if(nativeFilter && $_.B.op["equals"](col.filter, nativeFilter)){
      return col.filter(iterator, context);
    } 
    map(col, function(v,k){
      if(iterator.call(context,v)){
        results[results.length] = v;
      }
    });
    return results;
  };
  var every = function(col, iterator, context){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if(nativeEntry && col.every === nativeEntry){
      return col.every(iterator, context);
    }
    return _.every(col, iterator, context);
  };

  var include = function(col, ele){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if (nativeIndexOf && col.indexOf === nativeIndexOf){
      return col.indexOf(ele) != -1;
    }
    each(col,function(v){
      if($_.B.op["equals"](v,ele)) return true;
    }); 
    return false;
  };
  
  var invoke = function(col, method){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    var args = nativeSlice.call(arguments, 2);
    return each(col, function(obj){
      return ($_.F.isFunction(method) ? method || obj: obj[method] ||  function(){}).apply(obj, args);
    });
  };
  var pluck = _.pluck;
  var max = function(col, iterator, context){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    iterator = iterator || function(v){return v;};
    var result = reduce(col, function(memo,value){
      var computed = iterator.call(context, value);
      if(memo.computed < computed){
        memo.computed = computed;memo.value = value;
      }
      return memo;
    },{computed: -Infinity});
    return result.value;
  };

  var min = function(col, iterator, context){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    iterator = iterator || function(v){return v;};
    var result = reduce(col, function(memo,value){
      var computed = iterator.call(context, value);
      if(memo.computed > computed){
        memo.computed = computed;memo.value = value;
      }
      return memo;
    },{computed: Infinity});
    return result.value;
  };

  var shuffle = _.shuffle;
  var sort = function(arr, sort){
    if(!$_.O.isArray(arr)) return new TypeError();
    return arr.sort(sort);
  }

  $_.B.extend($_.A,{
    union: union,
    reduce: reduce,
    merge: union,
    first: first,
    last: last,
    initial: initial,
    filter: filter,
    every: every,
    include: include,
    invoke: invoke,
    pluck: pluck,
    max: max,
    min: min,
    shuffle: shuffle,
    sort: sort
  });
}).call(this,ceres);
(function($_){
   $_.N.namespace("ceres.F");
   var nativeSlice = Array.prototype.slice, has_own_property = Object.prototype.hasOwnProperty, fnProto = Function.prototype, nativeBind = fnProto.bind;
   var each = $_.C.each;
   var map = $_.C.map;
   var memoize = _.memoize;
   var compose = _.compose;
   var isFunction = _.isFunction;
   var now = _.now;
   var once = _.once;
   var curry = function(fn){
    var args = nativeSlice.call(arguments, 1);
    return function() {
      return fn.apply(this, args.concat(nativeSlice.call(arguments)));
    }
   };
   var partial = function(fn){
     var args = nativeSlice.call(arguments, 1);
     return function() {
       var arg = 0;
       var a = args.slice();
       for(var i=0; i< args.length && arg < arguments.length; i++){
         if(_.isUndefined(args[i])){
           a[i] = arguments[arg++];
         }
       }
       return fn.apply(this, a);
     }
   };
   var extract = function(fn, n){
     _.isNull(n) && (n=1);
     return function(){
       return fn.apply(this, nativeSlice.call(arguments, n));
     };
   };
   var bind = _.bind;
   var wrap = function(func, wrapper){
     if(!isFunction(func)) throw new TypeError;
     return function(){
       var a = $_.A.union([bind(func, this)], arguments);
       return wrapper.apply(this ,a);
     };
   };
   var before = function(after, pre, stop){
     if(!isFunction(after)|| !isFunction(pre)) throw new TypeError;
     return function(){
       var pres;
       if(!(pres = pre.apply(this, arguments))&&stop) return pres;
       return after.apply(this, arguments);
     };
   };
   var after = function(func, after){
     if(!isFunction(func) || !isFunction(after)) throw new TypeError;
     return function(){
       var a = $_.A.union([func.apply(this, arguments)], arguments);
       return after.apply(this, a);
     };
   };
   var methodize = function(func){
     if(func._methodized){
       return func._methodized;
     }
     return func._methodized = function(){
       var a = $_.A.union([this], nativeSlice.call(arguments,0));
       return func.apply(null, a);
     };
   };
   var or = function(){
     var fns = $_.A.filter(nativeSlice.call(arguments),$_.F.isFunction);
     for(var i=0; i<fns.length; i++){
       if(fns[i].apply(this, arguments)){
         return true;
       }
     }
     return false;
   };
   var and = function(){
     var fns = $_.A.filter(nativeSlice.call(arguments),$_.F.isFunction);
     for(var i=0; i<fns.length; i++){
       if(!fns[i].apply(this, arguments)){
         return false;
       }
     }
     return true;
   };

   var bindAll = _.bindAll;
   $_.B.extend($_.F,{
     memoize: memoize,
     compose: compose,
     wrap: wrap,
     curry: curry,
     partial: partial,
     extract: extract,
     bind: bind,
     before: before,
     after: after,
     methodize: methodize,
     now: now,
     once: once,
     isFunction: isFunction,
     or: or,
     and: and,
     bindAll: bindAll
   });
}).call(this,ceres);
(function($_){
  $_.N.namespace("ceres.O");
  var nativeEncode = encodeURIComponent;
  var each = $_.C.each;
  var map = $_.C.map;
  var curry = $_.F.curry;
  var compose = $_.F.compose;
  var not = curry(function(operator,operand){return operator.call(this,operand);}, $_.B.op["!"]);
  var isObject = _.isObject;
  var isUndefined = _.isUndefined;
  var isBoolean = _.isBoolean;
  var mixin = function(obj, mixin){
    if(!isObject(obj) || !isObject(mixin)){
      return new TypeError;
    } 
    map(obj, function(v,k){
      mixin[k] = v;
    });
    return mixin;
  };
  var take = function take(fn, times, base){
    if(times <= 1){
      return fn(base);
    }
    return fn(take(fn, times-1, base));
  };
  var isElement = _.isElement;
  var isNotElement = function(dom){
    return not(isElement(dom));
  };
  var isArray = _.isArray;
  var clone = function(obj){
    if(!isObject(obj)) throw new TypeError;
    if(isArray(obj) || isObject(obj)){
      return isArray(obj) ? obj.slice() : _.clone(obj);
    }
  };
  var pick = function(obj, keys){
    if(!isArray(keys) || !isObject(obj)){
      return new TypeError;
    }
    return _.pick(obj, keys);
  };

  var toQueryString = function(obj){
    var res = [];
    if(!isObject(obj)){
      throw new TypeError();
    }
    function toQueryPair(k, v){
      key = nativeEncode(k);
      if(isUndefined(v)){
        return k;
      }
      return k + '=' + nativeEncode(v);
    }
    map(obj, function(v,k){
      res.push(toQueryPair(k, v));
    });
    
    return res.join('&');
  };

  var omit = function(obj, keys){
    if(!isObject(obj) || isUndefined(keys)){
      throw new TypeError;
    }
    return _.omit(obj, keys);
  };
  var isNull = _.isNull;
  var isArray = _.isArray;

  $_.B.extend($_.O,{
    not: not,
    isObject: isObject,
    mixin: mixin,
    take: take,
    isElement: isElement,
    isNotElement: isNotElement,
    isUndefined: isUndefined,
    isArray: isArray,
    clone: clone,
    pick: pick,
    toQueryString: toQueryString,
    omit: omit,
    isNull:isNull,
    isBoolean:isBoolean,
    isArray:isArray
  });
}).call(this,ceres);
(function($_){
  $_.N.namespace("ceres.P");
  var validator = {
    types: {},
    isValid: function(types, data){
      for(var i=0; i<types.length; i++){
        var checker = this.types[types[i]];
        if(!checker.isValid.call(checker,data)){
          return false;
        }
      }
      return true;
    }
  };

  var Cmd = function(arg){
    this.arg = arg;
  };
  Cmd.prototype.execute = function(){
    this.action.call(this, this.arg);
  };
  var maker = function(method, arg){
    var c = function(){
      Cmd.call(this,arg);
    };
    c.prototype = new Cmd;
    c.prototype.action = method;
    return new c;
  };
  function Macro(){
    this.cmds = [];
  }
  Macro.prototype = new Cmd;
  Macro.prototype.add = function(cmd){
    this.cmds.push(cmd);
  };
  Macro.prototype.execute = function(){
    for(var i=0;i<this.cmds.length;i++){
      this.cmds[i].execute.call(this.cmds[i]);
    }
    this.cmds = [];
  };
  var cmdPattern = {
    maker: maker,
    macro: Macro,
    cmd: Cmd
  };
  $_.B.extend($_.P,{
    validator: validator,
    cmdPattern: cmdPattern
  });

}).call(this,ceres);
(function($_){
  $_.N.namespace("ceres.S");
  var isEmpty = function(v){
    return (!v || 0 === v.length);
  };
  $_.B.extend($_.S,{
    isEmpty: isEmpty
  });
}).call(this,ceres);
exports = ceres;
