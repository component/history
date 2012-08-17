
var History = require('..')
  , assert = require('assert');

describe('History', function(){
  describe('(arr)', function(){
    it('should populate the history', function(){
      var history = new History(['foo', 'bar', 'baz']);
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      history.prev().should.equal('foo');
    })
  })

  describe('.add(obj)', function(){
    it('should add to the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      history.prev().should.equal('foo');
    })

    it('should reset the index', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      history.add('hey');
      history.prev().should.equal('hey');
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
    })
  })

  describe('.prev()', function(){
    it('should cycle through the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      history.prev().should.equal('foo');
    })

    it('should cap the index', function(){
      var history = new History;
      history.add('foo');
      history.prev().should.equal('foo');
      history.prev();
      history.prev();
      history.prev();
      history.prev();
      history.next().should.equal('foo');
    })
  })

  describe('.next()', function(){
    it('should cycle through the history', function(){
      var history = new History;
      history.add('foo');
      history.add('bar');
      history.add('baz');
      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      history.prev().should.equal('foo');
      history.next().should.equal('foo');
      history.next().should.equal('bar');
      history.next().should.equal('baz');
    })

    it('should cap the index', function(){
      var history = new History;
      history.add('foo');
      history.next();
      history.next();
      history.next();
      history.next();
      history.next();
      history.prev().should.equal('foo');
    })
  })

  describe('.max(n)', function(){
    it('should cap the history entries', function(){
      var history = new History;
      history.max(2);
      history.add('foo');
      history.add('bar');
      history.add('baz');

      history.prev().should.equal('baz');
      history.prev().should.equal('bar');
      assert(null == history.prev());

      history.add('raz');
      history.prev().should.equal('raz');
      history.prev().should.equal('baz');
      assert(null == history.prev());
    })
  })
})