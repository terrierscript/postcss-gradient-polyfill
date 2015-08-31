var postcss = require('postcss');
var gradient = require("gradient-parser")
var Color = require("color")
module.exports = postcss.plugin('postcss-gradient-failover', function () {
  return function (css) {
    css.eachDecl('background', function (decl) {
      var colors = parseGradientColors(decl.value)
      var mixedColor = generatePolyfillColor(colors)
      decl.cloneBefore({
        prop: 'background',
        value: mixedColor
      })
    });
  };
});
function parseGradientColors(value){
  var colors = gradient.parse(value)[0].colorStops
  return colors.map(function(ast){
    try{
      if(ast.type === "hex"){
        return Color("#" + ast.value);
      }
    }catch(e){
      console.log(e)
      return null
    }
  }).filter(function(c){ // comapct
    return c
  })
}

function generatePolyfillColor(colors){
  return colors[0].mix(colors[1]).hexString()
}