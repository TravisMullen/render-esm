
<<<<<<< HEAD
/** @todo  Maybe use lodash :x */

=======
>>>>>>> Merged in bulk-render-updated (pull request #1)
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

<<<<<<< HEAD
/** not throwing error for now so other selection methods can still find modules/files */
export const validateFindBy = (foundFiles, target) => {
  const message = `no target modules or files found using "${target}"`
  if (!foundFiles.length) {
    console.warn(message)
    // throw new Error(message)
    //   return false
    // } else {
    //   return true
=======
export const validateFindBy = (foundFiles, target) => {
  if (!foundFiles.length) {
    console.warn(`no target modules or files found using "${target}"`)
    // throw new Error(`no target modules or files found using "${target}"`)
  //   return false
  // } else {
  //   return true
>>>>>>> Merged in bulk-render-updated (pull request #1)
  }
  return true
}
