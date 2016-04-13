const chai = require('chai')
const add = require('./add')

const expect = chai.expect

describe('add function', () => {
    it('should add three numbers together correctly', () => {
        expect(add(1, 2, 3)).to.equal(6)
    })
})
