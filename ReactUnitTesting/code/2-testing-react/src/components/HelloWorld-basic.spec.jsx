import { expect } from 'chai'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'

import HelloWorld from './HelloWorld'

describe('HelloWorld component basic', () => {
    it('should render correctly', () => {
        const renderer = createRenderer()
        renderer.render(<HelloWorld />)

        const actual = renderer.getRenderOutput()

        expect(actual.type).to.equal('div')
        expect(actual.props).to.deep.equal({ children: 'Hello world' })
    })
})
