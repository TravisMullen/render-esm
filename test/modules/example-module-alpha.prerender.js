
import camelcase from 'camelcase'

export const rawString = 'this is a test function!'

const renderString = camelcase(rawString)

export const renderedString = `this is a rendered string: ${renderString}`

const alphaFunction = () => {
  return `this is a default export rendered string: ${camelcase(rawString)}`
}

const renderedFunction = alphaFunction()

export default renderedFunction
