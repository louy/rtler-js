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
    it('skips empty declarations', function() {
      var a = 'div{}', b = '';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips with auto', function() {
      var a = 'div{right:0;}', b = 'div{left:0;right:auto;}';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips margin', function() {
      var a = 'div{margin-right:0;}', b = 'div{margin-left:0;margin-right:auto;}';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips with 0', function() {
      var a = 'div{padding-right:10px;}',
          b = 'div{padding-left:10px;padding-right:0;}';
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
