import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import TodoInput from './TodoInput'

describe('TodoInput', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<TodoInput />)

        expect(wrapper).to.have.exactly(1).descendants('form')
        expect(wrapper.find('form')).to.have.exactly(1).descendants('input')
        expect(wrapper.find('form')).to.have.exactly(1).descendants('button')
    })
})
