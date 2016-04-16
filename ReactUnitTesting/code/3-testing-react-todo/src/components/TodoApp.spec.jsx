import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import TodoApp from './TodoApp'
import TodoList from './TodoList'
import TodoInput from './TodoInput'

describe('TodoApp', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<TodoApp />)

        expect(wrapper).to.have.exactly(1).descendants(TodoList)
        expect(wrapper).to.have.exactly(1).descendants(TodoInput)
    })
})
