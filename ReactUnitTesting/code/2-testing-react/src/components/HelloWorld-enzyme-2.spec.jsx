import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import HelloWorld from './HelloWorld'

describe('HelloWorld component enzyme 2', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<HelloWorld />)

        expect(wrapper.equals(<div>Hello world</div>)).to.be.true
        expect(wrapper.find('div')).to.have.length(1)
        expect(wrapper.contains('Hello world')).to.be.true
    })
})
