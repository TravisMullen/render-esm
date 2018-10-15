import camelcase from 'camelcase'

export const rawString = 'this is a test function!'

export const renderedString = `this is a rendered string: ${rawString}`

const alphaFunction = () => {
  return `this is a default export rendered string: ${camelcase(rawString)}`
}

export default alphaFunction
