const assert = require('assert');
const { plus } = require('../functions');

describe('plus', function() {
  it('should return the sum of two numbers', function() {
    assert.strictEqual(plus(2, 3), 5);
    assert.strictEqual(plus(-1, 1), 0);
    assert.strictEqual(plus(0, 0), 0);
  });
});
