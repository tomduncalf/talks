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

function assertItems(wrapper, items) {
    expect(wrapper).to.have.exactly(items.length).descendants('li')
    items.forEach((item, index) => {
        const itemLi = wrapper.find('li').at(index)
        expect(itemLi).to.contain.text(item.item)
        expect(itemLi).to.contain.text(item.done ? 'Not done' : 'Done')
    })
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
        it('should add items to a list', () => {
            const wrapper = mount(<TodoApp />)

            addItem(wrapper, 'test 1')
            assertItems(wrapper, [{ item: 'test 1', done: false }])

            addItem(wrapper, 'test 2')
            assertItems(wrapper, [{ item: 'test 1', done: false }, { item: 'test 2', done: false }])
        })
    })

    describe('marking items done (using mount)', () => {
        it('should mark an item as done', () => {
            const wrapper = mount(<TodoApp />)

            addItem(wrapper, 'test 1')
            addItem(wrapper, 'test 2')
            wrapper.find('li').at(0).find('a').simulate('click')

            assertItems(wrapper, [{ item: 'test 1', done: true }, { item: 'test 2', done: false }])
        })
    })
})
