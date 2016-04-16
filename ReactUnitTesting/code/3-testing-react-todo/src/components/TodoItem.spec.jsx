import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import TodoItem from './TodoItem'

function assertItem(wrapper, text, linkText) {
    expect(wrapper).to.have.exactly(1).descendants('li')

    expect(wrapper).to.have.exactly(1).descendants('span')
    expect(wrapper.find('span')).to.have.text(text)

    expect(wrapper).to.have.exactly(1).descendants('a')
    expect(wrapper.find('a')).to.have.text(linkText)
}

describe('TodoItem', () => {
    it('should render correctly (original)', () => {
        const wrapper = shallow(<TodoItem item={{ item: 'Test' }} />)

        expect(wrapper).to.have.exactly(1).descendants('li')

        expect(wrapper).to.have.exactly(1).descendants('span')
        expect(wrapper.find('span')).to.have.text('Test')

        expect(wrapper).to.have.exactly(1).descendants('a')
        expect(wrapper.find('a')).to.have.text('Done')
    })

    it('should render the item as not done if "done" is not passed in', () => {
        const wrapper = shallow(<TodoItem item={{ item: 'Test' }} />)
        assertItem(wrapper, 'Test', 'Done')
    })

    it('should render the item as not done if "done" is false', () => {
        const wrapper = shallow(<TodoItem item={{ item: 'Test', done: false }} />)
        assertItem(wrapper, 'Test', 'Done')
    })

    it('should render the item as done if "done" is true', () => {
        const wrapper = shallow(<TodoItem item={{ item: 'Test', done: true }} />)
        assertItem(wrapper, 'Test', 'Not done')
    })
})
