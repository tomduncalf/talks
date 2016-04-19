import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import React from 'react'

import TodoItem from './TodoItem'

function assertItem(wrapper, text, done) {
    expect(wrapper).to.have.exactly(1).descendants('li')

    expect(wrapper).to.have.exactly(1).descendants('span')
    expect(wrapper.find('span')).to.have.text(text)
    expect(wrapper.find('span')).to.have.className(done ? 'done' : '')

    expect(wrapper).to.have.exactly(1).descendants('a')
    expect(wrapper.find('a')).to.have.text(done ? 'Not done' : 'Done')
}

describe('TodoItem', () => {
    describe('rendering', () => {
        it('should render correctly (original)', () => {
            const wrapper = shallow(<TodoItem item={{ item: 'Test' }} />)

            expect(wrapper).to.have.exactly(1).descendants('li')
            const li = wrapper.find('li')

            expect(li).to.have.exactly(1).descendants('span')
            expect(li.find('span')).to.have.text('Test')

            expect(li).to.have.exactly(1).descendants('a')
            expect(li.find('a')).to.have.text('Done')
        })

        it('should render the item as not done if "done" is not passed in', () => {
            const wrapper = shallow(<TodoItem item={{ item: 'Test' }} />)
            assertItem(wrapper, 'Test', false)
        })

        it('should render the item as not done if "done" is false', () => {
            const wrapper = shallow(<TodoItem item={{ item: 'Test', done: false }} />)
            assertItem(wrapper, 'Test', false)
        })

        it('should render the item as done if "done" is true', () => {
            const wrapper = shallow(<TodoItem item={{ item: 'Test', done: true }} />)
            assertItem(wrapper, 'Test', true)
        })
    })

    describe('clicking done', () => {
        it('should call the onDone callback when clicking "Done"', () => {
            const onDone = spy()
            const wrapper = shallow(<TodoItem item={{ item: '1' }} onDone={onDone} />)

            wrapper.find('a').simulate('click')

            expect(onDone).to.have.been.calledOnce
        })
    })
})
