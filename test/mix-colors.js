var mixColors = require("../mix-colors")
var assert = require("assert")
describe("mix-clors", function(){
  it("white * black = gray", function(){
    var result = mixColors(["#000000", "#ffffff"])
    assert.equal(result, "#808080")
  })
  it("mix rainbow", function(){
    var result = mixColors( [ '#ff0000',
      '#ffa500',
      '#ffff00',
      '#008000',
      '#0000ff',
      '#4b0082',
      '#ee82ee' ])
    assert.equal(result, "#9A54B8")
  })
})