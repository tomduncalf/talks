const R = require('ramda')
//var R = require('ramda-maybe')
const Either = require('data.either')

const log = R.tap(console.log)

const POSTCODE_REGEX = /^[A-Z]{1,2}\d{2}[A-Z]{2}$/

const removeSpaces = R.replace(/\s/g, '')

// const nth = R.curry((n, x) => x[n])
const nth = R.curry((n, x) => x[n] ? Either.Right(x[n]) : Either.Left('Postcode did not match regex'))

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
  if (coords.x < 20) {
    return Either.Right('London')
  } else {
    return Either.Left('Location not found')
  }
}

const validatePostcode = R.compose(
  //Either.either(x => { console.log('left') }, y => { console.log('right') }),
  R.chain(coordinatesToTown),
  //log,
  R.map(postcodeToCoordinates),
  //log,
  cleanPostcode
)

console.log(1, validatePostcode('A1 1AA'))
console.log(2, validatePostcode('A2 1AA'))
console.log(3, validatePostcode('B1 1AA'))
console.log(4, validatePostcode('A1A'))
