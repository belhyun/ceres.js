(function($_){
   $_.N.namespace("ceres.F");
   var native_slice = Array.prototype.slice, has_own_property = Object.prototype.hasOwnProperty, fnProto = Function.prototype, nativeBind = fnProto.bind;
   var each = $_.C.each;
   var map = $_.C.map;
   var memoize = _.memoize;
   var compose = _.compose;
   var isFunction = _.isFunction;
   var curry = function(fn){
    var args = native_slice.call(arguments, 1);
    return function() {
      return fn.apply(this, args.concat(native_slice.call(arguments)));
    }
   };
   var partial = function(fn){
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
   };
   var extract = function(fn, n){
     _.isNull(n) && (n=1);
     return function(){
       return fn.apply(this, native_slice.call(arguments, n));
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

   $_.B.extend($_.F,{
     memoize: memoize,
     compose: compose,
     wrap: wrap,
     curry: curry,
     partial: partial,
     extract: extract,
     bind: bind,
     before: before,
     after: after
   });
}).call(this,ceres);
