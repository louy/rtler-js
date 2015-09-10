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
    it('works with empty values', function() {
      var a = '', b = '';
      expect(rtler.flip(a)).to.equal(b);
    });
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
    it('flips padding', function() {
      var a = 'div{padding-right:10px;}',
          b = 'div{padding-left:10px;padding-right:0;}';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips short margin', function() {
      var a = 'div{margin:10px 20px 30px 40px;}',
          b = 'div{margin:10px 40px 30px 20px;}';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips short padding', function() {
      var a = 'div{padding:10px 20px 30px 40px;}',
          b = 'div{padding:10px 40px 30px 20px;}';
      expect(rtler.flip(a)).to.equal(b);
    });
    it('flips background position', function() {
      var a = 'div{background-position:right center;}',
          b = 'div{background-position:left center;}';
      expect(rtler.flip(a)).to.equal(b);

      var a1 = 'div{background-position:center top;}',
          b1 = '';
      expect(rtler.flip(a1)).to.equal(b1);

      var a2 = 'div{background-position:10px -10px;}',
          b2 = '';
      expect(rtler.flip(a2)).to.equal(b2);
    });
  });

  describe('#override', function() {
    it('works with empty values', function() {
      var a = '', b = '';
      expect(rtler.override(a)).to.equal(b);
    });
    it.skip('creates override', function() {
      var a = 'div{right:0}', b = 'div{left:0;right:auto}';
      expect(rtler.override(a)).to.equal(b);
    });
  });
});
