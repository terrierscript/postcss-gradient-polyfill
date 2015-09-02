var Color = require("color")

module.exports = function(colors){
  return colors.reduce(function(mixed, clr){
    if(mixed === null){
      return Color(clr)
    }
    return mixed.mix(Color(clr))
  }, null).hexString()
}
