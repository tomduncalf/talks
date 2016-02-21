const R = require('ramda')
//var R = require('ramda-maybe')
const Maybe = require('ramda-fantasy').Maybe

const log = R.tap(console.log)

const POSTCODE_REGEX = /^[A-Z]{1,2}\d{2}[A-Z]{2}$/

const removeSpaces = R.replace(/\s/g, '')

// const nth = R.curry((n, x) => x[n])
const nth = R.curry((n, x) => x[n] ? Maybe.Just(x[n]) : Maybe.Nothing())

const cleanPostcode = R.compose(
  nth(0),
  R.match(POSTCODE_REGEX),
  R.toUpper,
  removeSpaces
)

// 1: good vs undefined result
// console.log(cleanPostcode('A1 1AA'))
// console.log(cleanPostcode('A1 A'))

const postcodeToCoordinates = (postcode) => ({
  x: postcode.substr(0, 1) === 'A' ? 12.3 : 45.6,
  y: postcode.substr(1, 1) === '2' ? 78.9 : 0.12
})

// 3rd party function, can't handle nulls
// const checkServer = (postcode) => postcode[1] === '2'

const coordinatesToTown = (coords) => {
  if (coords.x) {
    return Maybe.Just(coords.x < 20 ? 'Manchester' : 'London')
  } else {
    return Maybe.Nothing()
  }
}

const validatePostcode = R.compose(
  R.map(coordinatesToTown),
  //log,
  R.map(postcodeToCoordinates),
  //log,
  cleanPostcode
)

console.log(1, validatePostcode('A1 1AA'))
console.log(2, validatePostcode('A2 1AA'))
console.log(3, validatePostcode('B1 1AA'))
console.log(4, validatePostcode('A1A'))
