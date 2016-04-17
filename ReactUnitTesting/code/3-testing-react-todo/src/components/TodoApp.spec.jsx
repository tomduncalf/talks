import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import React from 'react'

import TodoApp from './TodoApp'
import TodoList from './TodoList'
import TodoInput from './TodoInput'

function addItem(wrapper, item) {
    wrapper.find('input').get(0).value = item
    wrapper.find('input').simulate('change')
    wrapper.find('form').simulate('submit')
}

describe('TodoApp', () => {
    describe('rendering', () => {
        it('should render correctly', () => {
            const wrapper = shallow(<TodoApp />)

            expect(wrapper).to.have.exactly(1).descendants(TodoList)
            expect(wrapper).to.have.exactly(1).descendants(TodoInput)
        })
    })

    describe('adding items (by calling callbacks and checking state)', () => {
        it('should add an item to an empty list', () => {
            const wrapper = shallow(<TodoApp />)
            wrapper.find(TodoInput).at(0).prop('onAddItem')('test')
            expect(wrapper.state('items')).to.deep.equal([{ item: 'test' }])
        })

        it('should add an item to a list with one item', () => {
            const wrapper = shallow(<TodoApp />)
            wrapper.setState({ items: [{ item: 'test 1' }] })
            wrapper.find(TodoInput).at(0).prop('onAddItem')('test 2')
            expect(wrapper.state('items')).to.deep.equal([{ item: 'test 1' }, { item: 'test 2' }])
        })
    })

    describe('marking items done (by calling callbacks and checking state)', () => {
        it('should mark an item as done', () => {
            const wrapper = shallow(<TodoApp />)
            wrapper.setState({ items: [{ item: 'test 1' }, { item: 'test 2' }] })
            wrapper.find(TodoList).at(0).prop('onItemDone')(0)
            expect(wrapper.state('items')).to.deep.equal([{ item: 'test 1', done: true }, { item: 'test 2' }])
        })
    })

    describe('adding items (using mount)', () => {
        it('should add an item to an empty list', () => {
            const wrapper = mount(<TodoApp />)
            // addItem(wrapper, 'test')
            wrapper.find('input').get(0).value = 'Test'
            wrapper.find('input').simulate('change')
            wrapper.find('form').simulate('submit')
            //expect(wrapper).to.have.exactly(1).descendants('li')
        })
    })
})
