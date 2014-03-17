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
  var clone = _.clone;
  $_.B.op = op;
  $_.B.extend = extend;
  $_.B.clone = clone;
}).call(this,ceres);

