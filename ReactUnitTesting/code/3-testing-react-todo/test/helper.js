// Setup chai

import chai from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import sinonChai from 'sinon-chai'
chai.use(sinonChai)

// Setup jsdom

import { jsdom } from 'jsdom'

var exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
    	exposedProperties.push(property)
    	global[property] = document.defaultView[property]
  	}
})

global.navigator = {
  userAgent: 'node.js'
}