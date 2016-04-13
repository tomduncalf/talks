const chai = require('chai')
const add = require('./add')

chai.should()
const expect = chai.expect
const assert = chai.assert

describe('add function', () => {
    it('should add two numbers together correctly', () => {
        // BDD "should" style
        add(1, 2).should.equal(3)
        // BDD "expect" style
        expect(add(1, 2)).to.equal(3)
        // TDD "assert" style
        assert.equal(add(1, 2), 3)
    })
})
