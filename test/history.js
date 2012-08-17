
var History = require('..')
  , assert = require('assert');

describe('History', function(){
  describe('(arr)', function(){
    it('should populate the history', function(){
      var history = new History(['foo', 'bar', 'baz']);
      history.back().should.equal('baz');
      history.back().should.equal('bar');
      history.back().should.equal('foo');
    })
  })

  describe('.add(obj)', function(){
    it('should add to the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.back().should.equal('baz');
      history.back().should.equal('bar');
      history.back().should.equal('foo');
    })

    it('should reset the index', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.back().should.equal('baz');
      history.back().should.equal('bar');
      history.add('hey');
      history.back().should.equal('hey');
      history.back().should.equal('baz');
      history.back().should.equal('bar');
    })
  })

  describe('.back()', function(){
    it('should cycle through the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.back().should.equal('baz');
      history.back().should.equal('bar');
      history.back().should.equal('foo');
    })

    it('should cap the index', function(){
      var history = new History;
      history.add('foo');
      history.back().should.equal('foo');
      history.back();
      history.back();
      history.back();
      history.back();
      history.forward().should.equal('foo');
    })
  })

  describe('.forward()', function(){
    it('should cycle through the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.back().should.equal('baz');
      history.back().should.equal('bar');
      history.back().should.equal('foo');
      history.forward().should.equal('foo');
      history.forward().should.equal('bar');
      history.forward().should.equal('baz');
    })

    it('should cap the index', function(){
      var history = new History;
      history.add('foo');
      history.forward();
      history.forward();
      history.forward();
      history.forward();
      history.forward();
      history.back().should.equal('foo');
    })
  })

  describe('.max(n)', function(){
    it('should cap the history entries', function(){
      var history = new History;
      history.max(2);
      history.add('foo');
      history.add('bar');
      history.add('baz');

      history.back().should.equal('baz');
      history.back().should.equal('bar');
      assert(null == history.back());

      history.add('raz');
      history.back().should.equal('raz');
      history.back().should.equal('baz');
      assert(null == history.back());
    })
  })
})