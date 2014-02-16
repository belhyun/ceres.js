(function($_){
  $_.N.namespace("ceres.C");
  var core = $_.C;
  var native_slice = Array.prototype.slice, has_own_property = Object.prototype.hasOwnProperty;

  var each = _.each;
  var map = _.map;
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

  var behavior = {
    "each": each,
    "memoizer": _.memoize,
    "iterate": function(fn, base){
      return function(init){
        init = (init == null)? base: init;
        base = fn.call(this, init);
        return init;
      }
    },
    "take": function take(fn, times, base){
      if(times <= 1){
        return fn(base);
      }
      return fn(take(fn, times-1, base));
    },
    "compose": _.compose
  };

  var combine = {
     'curry': function(fn){
      var args = native_slice.call(arguments, 1);
      return function() {
        return fn.apply(this, args.concat(native_slice.call(arguments)));
      }
     },
     'partial': function(fn){
       var args = native_slice.call(arguments, 1);
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
     },
     'extract': function(fn, n){
       _.isNull(n) && (n=1);
       return function(){
         return fn.apply(this, native_slice.call(arguments, n));
       };
     }
  };

  $_.C.each = each;
  $_.C.map = map;
  $_.C.op = op;
  $_.C.behavior = behavior;
  $_.C.combine = combine;
}).call(this,ceres);
