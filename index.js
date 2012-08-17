
/**
 * Expose `History`.
 */

module.exports = History;

/**
 * Initialize a `History` with the given `vals`.
 *
 * @param {Array} vals
 * @api public
 */

function History(vals) {
  this.vals = vals || [];
  this.reset();
  this.max(1000);
}

/**
 * Cap the entries.
 *
 * @api private
 */

History.prototype.cap = function(){
  var max = this._max;
  var len = this.vals.length;
  var remove = len - max;
  if (remove <= 0) return;
  while (remove--) this.vals.shift();
  this.reset();
};

/**
 * Set the maximum number of entries to `n`.
 *
 * @param {Number} n
 * @return {History}
 * @api public
 */

History.prototype.max = function(n){
  this._max = n;
  this.cap();
  return this;
};

/**
 * Add a `val`.
 *
 * @param {Object} val
 * @return {History}
 * @api public
 */

History.prototype.add = function(val){
  this.i = this.vals.push(val) - 1;
  this.cap();
  return this;
};

/**
 * Cycle backwards through history.
 *
 * @return {Object}
 * @api public
 */

History.prototype.prev = function(){
  if (this.i < 0) return;
  return this.vals[this.i--];
};

/**
 * Cycle forward through history.
 *
 * @return {Object}
 * @api public
 */

History.prototype.next = function(){
  var len = this.vals.length;
  if (this.i == len - 1) return;
  return this.vals[++this.i];
};

/**
 * Reset the history index.
 *
 * @return {History}
 * @api public
 */

History.prototype.reset = function(){
  this.i = this.vals.length - 1;
  return this;
};
