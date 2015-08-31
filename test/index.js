var postcss = require('postcss')
var expect  = require('chai').expect

var plugin = require('../')

var test = function (input, output) {
  expect(postcss(plugin).process(input).css).to.eql(output)
}

describe('postcss-size', function () {

  it('use median color', function () {
    test(
      'a{ background: linear-gradient(#000, #fff);}', 
      'a{ background: #808080; background: linear-gradient(#000, #fff);}'
    );
  })
})