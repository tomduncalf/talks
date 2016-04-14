import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import HelloWorld from './HelloWorld'

describe('HelloWorld component enzyme', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<HelloWorld />)
        expect(wrapper.equals(<div>Hello world</div>)).to.be.true
    })
})
