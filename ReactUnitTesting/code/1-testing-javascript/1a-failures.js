const assert = require('assert')
const add = require('./add')

describe('add function', () => {
    it('should add three numbers together correctly', () => {
        assert(add(1, 2, 3) === 6, '1 + 2 + 3 did not equal 6')
    })
})
