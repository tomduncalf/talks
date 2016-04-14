import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import { shallow } from 'enzyme'
import React from 'react'

import HelloWorld from './HelloWorld'

describe('HelloWorld component chai-enzyme', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<HelloWorld />)

        // expect(wrapper.equals(<div>Hello world</div>)).to.be.true
        expect(wrapper).to.have.html('<div>Hello world</div>')
        // expect(wrapper.find('div')).to.have.length(1)
        expect(wrapper).to.have.exactly(1).descendants('div')
        // expect(wrapper.contains('Hello world')).to.be.true
        expect(wrapper).to.contain('Hello world')
    })
})
