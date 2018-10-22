
/** @todo  Maybe use lodash :x */

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

/** not throwing error for now so other selection methods can still find modules/files */
export const validateFindBy = (foundFiles, target) => {
  const message = `no target modules or files found using "${target}"`
  if (!foundFiles.length) {
    console.warn(message)
    // throw new Error(message)
    //   return false
    // } else {
    //   return true
  }
  return true
}
