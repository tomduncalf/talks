const R = require('ramda')

const IO = function(fn) {
  // Same as __value, but renamed
  this.unsafePerformIO = fn
}

IO.of = function(x) {
  return new IO(function() {
    return x;
  })
}

IO.prototype.map = function(fn) {
  return new IO(R.compose(fn, this.unsafePerformIO))
}

// getFromStorage :: String -> (_ -> String)
const getFromStorageOld = function(key) {
  return function() {
    return window.localStorage[key]
  }
}

/*window = { localStorage: { test: 'hello' } }

const getFromStorage = new IO((key) => window.localStorage[key])
console.log(getFromStorage.map(R.length).unsafePerformIO('test'))*/

window = { location: { href: 'http://test.com' } }

// url :: IO String
const url = IO.of(window.location.href)
//console.log(url)

const currentEmailDomain = url.map(R.match(/[a-z]*\.com/)).map(R.nth(0)).map(R.concat('@'))
//console.log(myTest)
//console.log(currentEmailDomain.unsafePerformIO())

// urlToEmailDomain :: String -> String
const urlToEmailDomain = R.pipe(R.match(/[a-z]*\.com/), R.nth(0), R.concat('@'))
//console.log(urlToEmailDomain('http://www.google.com')) // returns: '@google.com'

//console.log(url.map(urlToEmailDomain)) // returns: IO String: { unsafePerformIO: [Function] }
//console.log(url.map(urlToEmailDomain).unsafePerformIO()) // returns: IO String: { unsafePerformIO: [Function] }

// const adminEmail = R.pipe(R.map(urlToEmailDomain), R.map(R.concat('admin')))
// console.log(currentAdminEmail.unsafePerformIO()) // returns: IO String: { unsafePerformIO: [Function] }
//console.log(currentEmailDomain.unsafePerformIO())

const url2 = new function() {
  this.unsafePerformIO = function() {
    return window.location.href
  }
}

//console.log(new url2().unsafePerformIO)

//console.log(url2.unsafePerformIO())

const step1 = new function() {
  this.unsafePerformIO = function() {
    return window.location.href
  }
}

console.log(step1.unsafePerformIO())

const step2 = new function() {
  this.unsafePerformIO = R.compose(R.match(/[a-z]*\.com/), () => window.location.href)
}

console.log(step2.unsafePerformIO())
/*const urlEmailReal = new function() {
  this.unsafePerformIO = function() {
    return R.compose(R.concat('@'), R.nth(0), R.match(/[a-z]*\.com/))(window.location.href)
  }
}

console.log(urlEmailReal.unsafePerformIO())
*/

const urlEmail = new function() {
  this.unsafePerformIO = R.compose(
    R.concat('@'),
    R.nth(0),
    R.match(/[a-z]*\.com/),
    function() { return window.location.href }
  )
}

console.log(urlEmail.unsafePerformIO())

// domainToEmail :: String -> String
const domainToEmail = R.compose(R.concat('@'), R.nth(0), R.match(/[a-z]*\.com/))

const urlEmail2 = R.compose(R.map(domainToEmail), url)

console.log(urlEmail2.unsafePerformIO())
