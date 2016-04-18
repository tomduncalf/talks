const add = require('./add')

describe('add function', () => {
    it('should add two numbers together correctly', () => {
        if (add(1, 2) !== 3) {
            throw new Error('1 + 2 did not equal 3')
        }

        // or...
        const assert = require('assert')
        assert(add(1, 2) === 3, '1 + 2 did not equal 3')
    })
})
