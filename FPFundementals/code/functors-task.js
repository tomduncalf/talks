const R = require('ramda')
//var R = require('ramda-maybe')
const Task = require('data.task')
const fetch = require('node-fetch')

const fetchJSON = R.curry(url => {
  return new Task((reject, resolve) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
})

const URL = 'http://www.tomduncalf.com'

const matchURL = R.match(/(http:\/\/github.*)>GitHub/)

/*console.log(getPage().fork(
  error => console.error(error),
  data => console.log(data)
))*/

const log = R.tap(console.log)

const testFn = R.compose(
  R.map(R.length),
  R.chain(getPage),
  R.map(R.nth(1)),
  R.map(matchURL),
  getPage
)

//console.log(getPage(URL).fork()

testFn('http://www.tomduncalf.com').fork(
  err => console.log('error', error),
  data => console.log(data)
)
