var postcss = require("postcss");
var Color = require("color")

var parseGradientColors = function(value){
  try{
    var colors = gradient.parse(value)[0].colorStops
    return colors
  }catch(e){}
  return []
}

// convert to `Color` object
var convertToColors = function (colors){
  return colors.map(function(ast){
    try{
      if(ast.type === "hex"){
        return Color("#" + ast.value);
      }
    }catch(e){
      return null
    }
  }).filter(function(c){ // comapct
    return c
  })
}

var mixColor = function(color1, color2){
  if(!color1 || !color2){
    return undefined
  }
  return color1.mix(color2).hexString()
}

var getMixedColor = function(decl){
  var colors = convertToColors(parseGradientColors(decl.value))
  var mixedColor = mixColor(colors[0], colors[1])
  if(!mixedColor){
    return
  }
  return mixedColor
}

module.exports = postcss.plugin('postcss-gradient-polyfill', function () {
  return function (css, result) {
    css.eachRule(function (rule) {
      var defaultBackground = undefined
      rule.eachDecl('background', function (decl) {
        var color = getColor(decl)
        if(color){
          defaultBackground = color
          return
        }
        if(defaultBackground){
          return
        }
        var mixedColor = getMixedColor(decl)
        decl.cloneBefore({
          prop: 'background',
          value: mixedColor
        })
        defaultBackground = mixedColor
      });
    });
  };
});
