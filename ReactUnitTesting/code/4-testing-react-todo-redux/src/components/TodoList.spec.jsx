import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import TodoList from './TodoList'
import TodoItem from './TodoItem'

const getWrapper = (items) => shallow(<TodoList items={items} onItemDone={() => {}} />)

describe('TodoList', () => {
    it('should render no items for an empty list', () => {
        const wrapper = getWrapper([])

        expect(wrapper).to.have.exactly(1).descendants('ul')
        expect(wrapper.find('ul')).to.not.have.descendants(TodoItem)
    })

    it('should render items', () => {
        const items = [{ item: 'item 1' }, { item: 'item 2', done: true }]
        const wrapper = getWrapper(items)

        expect(wrapper).to.have.exactly(1).descendants('ul')
        expect(wrapper.find('ul')).to.have.exactly(2).descendants(TodoItem)
        expect(wrapper.find(TodoItem).at(0).prop('item')).to.deep.equal(items[0])
        expect(wrapper.find(TodoItem).at(1).prop('item')).to.deep.equal(items[1])
    })
})
