var Color = require("color")

var average = function(arr) {
  var sum = arr.reduce(function(prev, current) {
    return prev + current
  });
  return sum / arr.length
}

module.exports = function(colors){
  var r = []
  var g = []
  var b = []
  var cs = colors.map(function(clr){
    var rgb = Color(clr).rgbArray()
    r.push(rgb[0])
    g.push(rgb[1])
    b.push(rgb[2])
  })
  return Color().rgb(average(r), average(g), average(b)).hexString()
  return colors.reduce(function(mixed, clr){
    if(mixed === null){
      return Color(clr)
    }
    return mixed.mix(Color(clr))
  }, null).hexString()
}
