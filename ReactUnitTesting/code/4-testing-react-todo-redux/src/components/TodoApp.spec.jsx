import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import React from 'react'
import { createStore } from 'redux'

import { default as DecoratedTodoApp, TodoApp } from './TodoApp'
import TodoList from './TodoList'
import TodoInput from './TodoInput'
import { default as todosReducer } from 'redux/todos'
import * as todosActions from 'redux/todos'

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

function getMountedAndStore(initialState = undefined) {
    const store = createStore(todosReducer, initialState)
    const context = { store }

    return [mount(<DecoratedTodoApp />, { context }), store]
}

function getMounted(initialState = undefined) {
    return getMountedAndStore(initialState)[0]
}

describe('TodoApp (un-decorated)', () => {
    describe('rendering', () => {
        it('should render correctly', () => {
            const wrapper = shallow(<TodoApp />)

            expect(wrapper).to.have.exactly(1).descendants(TodoList)
            expect(wrapper).to.have.exactly(1).descendants(TodoInput)
        })
    })
})

describe('TodoApp (decorated)', () => {
    describe('adding items (using mount)', () => {
        it('should add items to a list', () => {
            const wrapper = getMounted()

            addItem(wrapper, 'test 1')
            assertItems(wrapper, [{ item: 'test 1', done: false }])

            addItem(wrapper, 'test 2')
            assertItems(wrapper, [{ item: 'test 1', done: false }, { item: 'test 2', done: false }])
        })
    })

    describe('marking items done (using mount)', () => {
        it('should mark an item as done', () => {
            const wrapper = getMounted()

            addItem(wrapper, 'test 1')
            addItem(wrapper, 'test 2')
            wrapper.find('li').at(0).find('a').simulate('click')

            assertItems(wrapper, [{ item: 'test 1', done: true }, { item: 'test 2', done: false }])
        })
    })
})

describe('TodoApp (Redux integration)', () => {
    it('should render items from the initial state', () => {
        const initialState = {
            todos: [
                { item: 'test 1', done: true },
                { item: 'test 2' },
            ]
        }
        const wrapper = getMounted(initialState)

        assertItems(wrapper, [{ item: 'test 1', done: true }, { item: 'test 2', done: false }])
    })

    it('should add items to a list when calling the addTodo action', () => {
        const [wrapper, store] = getMountedAndStore()

        store.dispatch(todosActions.addTodo({ item: 'test 1' }))
        store.dispatch(todosActions.addTodo({ item: 'test 2' }))

        assertItems(wrapper, [{ item: 'test 1' }, { item: 'test 2' }])
    })

    it('should mark items as done when calling the toggleTodoDone action', () => {
        const initialState = {
            todos: [
                { item: 'test 1', done: true },
                { item: 'test 2' },
            ]
        }
        const [wrapper, store] = getMountedAndStore(initialState)

        store.dispatch(todosActions.toggleTodoDone(1))

        assertItems(wrapper, [{ item: 'test 1', done: true }, { item: 'test 2', done: true }])
    })
})
