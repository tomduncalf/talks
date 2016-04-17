import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'
import React from 'react'

import TodoInput from './TodoInput'

describe('TodoInput', () => {
	describe('rendering', () => {
	    it('should render correctly', () => {
	        const wrapper = shallow(<TodoInput />)

	        expect(wrapper).to.have.exactly(1).descendants('form')
	        expect(wrapper.find('form')).to.have.exactly(1).descendants('input')
	        expect(wrapper.find('form')).to.have.exactly(1).descendants('button')
	    })
	})

	describe('submitting', () => {
		it('should call the callback with the input value on clicking the button', () => {
			const onAddItem = spy()
			const wrapper = mount(<TodoInput onAddItem={onAddItem} />)

			wrapper.find('input').get(0).value = 'test'
			wrapper.find('input').simulate('change')
			wrapper.find('form').simulate('submit')

			expect(onAddItem).to.have.been.calledWith('test')
		})
	})
})
