var F = function(){
};
F.prototype.c = function(v){
  console.log(v);
};
ceres.PROTO.mix(F,{a:1,b:2,c:function(){return 4;}});
var f = new F;
console.log(f.a);
console.log(f.b);
f.c();
