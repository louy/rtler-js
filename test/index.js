/* jshint mocha: true, expr: true */

var chai = require('chai'),
    expect = chai.expect,
    rtler = require('..');

describe('rtler', function() {
  it('is as expected', function() {
    expect(rtler).to.be.an('object');
    expect(rtler).itself.to.respondTo('flip');
    expect(rtler).itself.to.respondTo('override');
  });

  describe('#flip', function() {
    it('removes comments', function() {
      var a = '/*abc*/', b = '';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips', function() {
      var a = 'div{right:0}', b = 'div{left:0}';
      expect(rtler.flip(a)).to.equal(b);
    });
  });

  describe.skip('#override', function() {
    it('creates override', function() {
      var a = 'div{right:0}', b = 'div{left:0;right:auto}';
      expect(rtler.override(a)).to.equal(b);
    });
  });
});
