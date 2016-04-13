const assert = require('assert')
const add = require('./add')

describe('add function', () => {
    it('should add two numbers together correctly', () => {
        assert(add(1, 2) === 3)
    })
})
