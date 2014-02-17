(function($_){
   $_.N.namespace("ceres.F");
   var native_slice = Array.prototype.slice, has_own_property = Object.prototype.hasOwnProperty;
   var each = $_.C.each;
   var map = $_.C.map;
   var memoize = _.memoize;
   var compose = _.compose;
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

   $_.F.memoize = memoize;
   $_.F.compose = compose;
   $_.F.curry = curry;
   $_.F.partial = partial;
   $_.F.extract = extract;
}).call(this,ceres);
