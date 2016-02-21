const R = require('ramda')

const Container = function(x) {
  this.__value = x // treat this as private
}

Container.of = x => new Container(x)

// map :: (a -> b) -> Container a -> Container b
Container.prototype.map = function(fn) {
  return Container.of(fn(this.__value))
}

const hello = Container.of({ message: 'hello world' })
//console.log(hello.map(R.prop('message')).map(R.length).map(R.concat('length is: '))) // returns: Container(11)

const Maybe = function(x) {
  this.__value = x
}

Maybe.of = x => new Maybe(x)

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined)
}

Maybe.prototype.map = function(fn) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
}

//console.log(Maybe.of('hello world').map(R.match(/hello/)).map(R.length))
//console.log(Maybe.of(null).map(R.match(/hello/)))
//console.log(Container.of(null).map(R.match(/hello/)))

// pipe composes left-to-right
// const numberOfHellos = R.pipe(R.map(R.match(/hello/)), R.map(R.length))
//const numberOfHellos = R.pipe(Maybe.of(R.match(/hello/)), R.map(R.length))
//Maybe.of('hello world').map(numberOfHellos) // returns: Maybe(1)

//  safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0])
//console.log(safeHead([1,2,3])) // returns: Maybe(1)
//console.log(safeHead([])) // returns: Maybe(null)

//  maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = R.curry((defaultValue, transformFn, m) => {
  return m.isNothing() ? defaultValue : transformFn(m.__value)
})

const maybeResult = safeHead([1, 2, 3])
const getResult = maybe('No data', x => x)
//console.log(getResult(safeHead([1, 2, 3])))
//console.log(getResult(safeHead([])))

Maybe.prototype.getOrElse = function(defaultValue) {
  return this.isNothing() ? defaultValue : this.__value
}

//console.log(safeHead([1, 2, 3]).getOrElse('No data'))
//console.log(safeHead([]).getOrElse('No data'))


// lengthOfHead :: [a] -> Maybe String
const lengthOfHead = R.pipe(safeHead, R.map(R.length), R.map(R.concat('Length: ')))
console.log(lengthOfHead(['one', 'two', 'three']))
console.log(lengthOfHead([]))


// safeProp :: Key -> {Key: a} -> Maybe a
const safeProp = R.curry((key, obj) => Maybe.of(obj[key]))

// safeHead :: [a] -> Maybe a
const safeHead2 = safeProp(0)

// firstAddressStreet :: Object -> Maybe(Maybe(Maybe String))
const firstAddressStreet = R.compose(
  map(map(safeProp('street'))), // need to double map because we now have Maybe(Maybe)!
  map(safeHead2), // need to map to work with the Maybe from safeProp
  safeProp('addresses')
)

console.log(firstAddressStreet)
