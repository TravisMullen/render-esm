
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

export const validateFindBy = (foundFiles, target) => {
  if (!foundFiles.length) {
    console.warn(`no target modules or files found using "${target}"`)
    // throw new Error(`no target modules or files found using "${target}"`)
  //   return false
  // } else {
  //   return true
  }
  return true
}
