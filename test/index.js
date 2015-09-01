var postcss = require('postcss')
var expect  = require('chai').expect

var autoprefixer = require('autoprefixer')
var plugin = require('../')


describe('postcss-color', function () {
  describe('unit test', function(){
    var test = function (input, output) {
      expect(postcss(plugin).process(input).css).to.eql(output)
    }

    it('use median color', function () {
      test(
        'a{ background: linear-gradient(#000, #fff);}', 
        'a{ background: #808080; background: linear-gradient(#000, #fff);}'
      );
    })
    it('not overwrite when exists polyfill', function () {
      test(
        'a{ background: #cccccc; background: linear-gradient(#000, #fff);}',
        'a{ background: #808080; background: linear-gradient(#000, #fff);}'
      );
    })
  })
  describe('with autoprefixer', function(){
    it('[plugin , autoprefixer]', function(){
      var test1 = function (input, output) {
        expect(postcss([
          plugin, autoprefixer
        ]).process(input).css).to.eql(output)
      }
      test1(
        'a{ background: linear-gradient(#000, #fff);}', 
        'a{ background: #808080; background: -webkit-linear-gradient(#000, #fff); background: linear-gradient(#000, #fff);}'
      );
    })
    it('[autoprefixer, plugin]', function(){
      var test2 = function (input, output) {
        expect(postcss([
          autoprefixer, plugin
        ]).process(input).css).to.eql(output)
      }
      test2(
        'a{ background: linear-gradient(#000, #fff);}', 
        'a{ background: #808080; background: -webkit-linear-gradient(#000, #fff); background: linear-gradient(#000, #fff);}'
      );
    })
  })
})