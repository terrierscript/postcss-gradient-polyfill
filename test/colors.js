var assert = require("assert")
var colors = require("../colors")
describe("parse-colors", function(){
  it("should parse named color", function(){
    var result = colors("linear-gradient( to left top, blue, red)");
    assert.deepEqual(["#0000ff", "#ff0000"], result)
  })
  it("should parse hex color", function(){
    var result = colors("linear-gradient( to left top, #83cccc, #facccc)");
    assert.deepEqual(["#83cccc", "#facccc"], result)
  })
  it("should parse min hex color", function(){
    var result = colors("linear-gradient(#000, #fff)");
    assert.deepEqual(["#000000", "#ffffff"], result)
  })
  it("should parse multiple (rainbow) color", function(){
    var result = colors("linear-gradient( to right, red, orange, yellow, green, blue, indigo, violet)");
    var expect = [ '#ff0000',
      '#ffa500',
      '#ffff00',
      '#008000',
      '#0000ff',
      '#4b0082',
      '#ee82ee' ]
    assert.deepEqual(expect,result)
  })
})