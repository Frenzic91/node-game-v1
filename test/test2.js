/* eslint-env mocha */

var assert = require('assert')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})

describe('Array', function () {
  describe('#slice()', function () {
    it('should return 2, the 0th element the sliced array', function () {
      assert.equal([2].indexOf(0), [1, 2, 3].slice(1, 2).indexOf(0))
    })
  })
})
