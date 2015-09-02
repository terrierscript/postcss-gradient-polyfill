var postcss = require("postcss")
var Color = require("color")
var parseColor = require("./colors")

var mixColors = function(colors){
  return colors.reduce(function(mixed, clr){
    if(mixed === null){
      return Color(clr)
    }
    return mixed.mix(Color(clr))
  }, null).hexString()
}

var safeParseColor = function(decl, result){
  try{
    return parseColor(decl.value)
  }catch(e){
    result.warn("Invalid parse color: " + e)
  }
  return []
}

module.exports = postcss.plugin('postcss-gradient-polyfill', function () {
  return function (css, result) {
    css.eachRule(function (rule) {
      var defaultBackground = undefined
      rule.eachDecl('background', function (decl) {
        if(defaultBackground){ // avoid duplicate
          return
        }
        var colors = safeParseColor(decl, result)

        if(colors.length === 1){
          defaultBackground = colors[0]
          return
        }
        var mixedColor = mixColors(colors)
        decl.cloneBefore({
          prop: 'background',
          value: mixedColor
        })
        defaultBackground = mixedColor
      });
    });
  };
});
