var func = function(){
  return this.name +" "+ arguments[0][0] + " " +arguments[0][1];
};
func = ceres.F.bind(func, {name: 'moe'}, 'hi' , 'i love you');
console.log(func());
