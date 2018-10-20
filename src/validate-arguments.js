
export const isArrayOfStrings = (argValue, messagePrefix = 'first') => {
  if (!Array.isArray(argValue)) {
    throw new TypeError(`${messagePrefix} argument should be Array of Strings <string[]>`)
  }

  if (argValue.length &&
      Object.values(argValue)
        .filter(i => typeof (i) !== 'string')
        .length) {
    throw new TypeError(`${messagePrefix} argument contains a non-String in its Array <string[]>`)
  }
}
