
import camelcase from 'camelcase'

const rawString = 'this is a `const` string!'

const betaFunction = () => {
  return `this is a default export rendered string: ${camelcase(rawString)}`
}

const renderedFunction = betaFunction()

export { renderedFunction as betaContent }
