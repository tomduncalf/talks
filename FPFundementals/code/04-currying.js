const curry = require('lodash/fp/curry')

const emailAddresses = [
  'tduncalf@gmail.com',
  'tom.duncalf@gmail.com',
  'john.smith@hotmail.com',
  'jsmith@googlemail.com'
]

console.log('---\nsplitEmail')

// split :: String -> String -> [String]
const split = curry((separator, input) => {
  return input.split(separator)
})

// getSplitAtIndex :: String -> Number -> String -> String
const getSplitAtIndex = curry((separator, index, input) => {
  return split(separator)(input)[index]
  // return split(separator, input)[index] - same thing
  // return input.split(separator)[index] - but we want to build up a toolbelt of useful functions
})

// splitEmail :: String -> Number -> String
const splitEmail = getSplitAtIndex('@', 0)
console.log(splitEmail('tduncalf@gmail.com'))

// Compare to:
const splitEmailNonCurried = email => email.split('@')[0]
console.log(splitEmailNonCurried('tduncalf@gmail.com'))



console.log('---\nsplitEmails')

// map :: (a -> b) -> [a] -> [b]
const map = curry((mapFn, inputArray) => {
  return inputArray.map(mapFn)
})

// splitEmails :: [String] -> [String]
const splitEmails = map(splitEmail)
console.log(splitEmails(emailAddresses))

// Compare to: - no intermediate names needed, more concise
const splitEmailsNonCurried = emails => emails.map(email => splitEmail(email))
console.log(splitEmailsNonCurried(emailAddresses))



console.log('---\ncontainsDot')

// containsString :: String -> String -> Bool
const containsString = curry((search, input) => {
  return input.indexOf(search) !== -1
})

// containsDot :: String -> Bool
const containsDot = containsString('.')
console.log(containsDot('tduncalf'))
console.log(containsDot('tom.duncalf'))

// Combine the two
// emailContainsDot1 :: String -> Bool
// Awkward nested brackets as we chain more functions together
const emailContainsDot1 = email => containsDot(splitEmail(email))
console.log(emailContainsDot1('tduncalf@gmail.com'))
console.log(emailContainsDot1('tom.duncalf@gmail.com'))



// Composition
const compose = require('lodash/fp/compose')

console.log('---\nemailContainsDot')

// emailContainsDot :: String -> Bool
const emailContainsDot = compose(containsDot, splitEmail)
console.log(emailContainsDot('tduncalf@gmail.com'))
console.log(emailContainsDot('tom.duncalf@gmail.com'))

console.log('---\nemailsContainsDot')

// emailsContainDot :: [String] -> [Bool]
const emailsContainDot = compose(map(containsDot), map(splitEmail))
console.log(emailsContainDot(emailAddresses))

console.log('---\findEmailsContainingDot')

// filter :: (a -> Bool) -> [a] -> [a]
const filter = curry((filterFn, inputArray) => {
  return inputArray.filter(filterFn)
})

// findEmailsContainingDot :: [String] -> [String]
const findEmailsContainingDot = compose(filter(containsDot), map(splitEmail))
console.log(findEmailsContainingDot(emailAddresses))

console.log('---\nreplaceDotWithSpace')

// replace :: String -> String -> String -> String
const replace = curry((search, replace, input) => {
  return input.replace(search, replace)
})

// replaceDotWithSpace :: String -> String
const replaceDotWithSpace = replace('.', ' ')
// emailsToNames :: [String] -> [String]
const emailsToNames = compose(map(replaceDotWithSpace), filter(containsDot), map(splitEmail))
console.log(emailsToNames(emailAddresses))

// capitalizeFirstLetter :: String -> String
const capitalizeFirstLetter = input => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

// join :: String -> [String] -> String
const join = curry((delimiter, input) => {
  return input.join(delimiter)
})

// capitalizeFirstLetters :: String -> String
const capitalizeFirstLetters = compose(join(' '), map(capitalizeFirstLetter), split(' '))

// emailsToGreetings :: [String] -> [String]
const emailsToGreetings = compose(map(capitalizeFirstLetters), map(replaceDotWithSpace), filter(containsDot), map(splitEmail))
console.log(emailsToGreetings(emailAddresses))

const emailsToGreetings2 = compose(map(compose(capitalizeFirstLetters, replaceDotWithSpace)), filter(containsDot), map(splitEmail))
console.log(emailsToGreetings2(emailAddresses))

const dottedNameToGreeting = compose(capitalizeFirstLetters, replaceDotWithSpace)
const emailsToGreetings3 = compose(map(dottedNameToGreeting), filter(containsDot), map(splitEmail))
console.log(emailsToGreetings3(emailAddresses))

const emailsToGreetings4 = compose(map(dottedNameToGreeting), filter(containsDot), splitEmails)
console.log(emailsToGreetings4(emailAddresses))

const emailsToGreetingsFull = compose(
  map(compose(
    join(' '),
    map(capitalizeFirstLetter),
    split(' '))
  ),
  map(replace('.', ' ')),
  filter(containsString('.')),
  map(getSplitAtIndex('@', 0))
)
console.log(emailsToGreetingsFull(emailAddresses))
