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

const userStars = user => fetchJSON(`https://api.github.com/users/${user}/starred`)
const githubUser = user => fetchJSON(`https://api.github.com/users/${user}`)

const starredProjects = R.compose(
  R.map(
    R.map(R.path(['owner', 'login']))
  ),
  userStars
)

starredProjects('tomduncalf').fork(() => {}, data => console.log(data))
