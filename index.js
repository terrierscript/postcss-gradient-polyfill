var postcss = require('postcss');
var gradient = require("gradient-parser")
var color = require("color")
module.exports = postcss.plugin('postcss-gradient-failover', function () {
  return function (css) {
    css.eachDecl('background', function (decl) {
      var colors = parseGradientColors(decl.value)
      generateFailoverColor(colors)
      // console.log(decl.value)
      // var sizes = postcss.list.space(decl.value);
      // if ( sizes.length === 1 ) sizes[1] = sizes[0];
      // 
      // decl.cloneBefore({ prop: 'width',  value: sizes[0] });
      // decl.cloneBefore({ prop: 'height', value: sizes[1] });
      // 
      // decl.removeSelf();
    });
  };
});
function parseGradientColors(value){
  var colors = gradient.parse(value)[0].colorStops
  return colors.map(function(ast){
    if(ast.type === "hex"){
      return "#" + value;
    }
    return value
  })
}

function generateFailoverColor(colors){
  colors.reduce(function(color1, color2){
    if(){
      
    }
  }, null)
}