var parseColor = require("parse-color")
var gradient = require("gradient-parser")

var parseGradient = function(value, result){
  try{
    return gradient.parse(value)
  }catch(e){
    if(typeof result === "object" && typeof result.warn === "function"){
      result.warn("Invalit gradient:" + e)
    }
  }
  return
}

var getStepColors = function(ast){
  var colorStops = ast.map(function(ast){
    return ast.colorStops
  })

  // flatten
  colorStops = Array.prototype.concat.apply([], colorStops)
  return colorStops.map(function(step){
    if(step.type === 'hex'){
      return getHexColor("#" + step.value)
    }
    return getHexColor(step.value)
  })
}

// default color
var getHexColor = function(value){
  var color = parseColor(value)
  return color.hex 
}


module.exports = function(value, postCssResult){
  var color = getHexColor(value)
  if(color !== undefined){
    return [color]
  }
  var ast = parseGradient(value, postCssResult)
  if(!ast){
    return []
  }
  return getStepColors(ast)
}