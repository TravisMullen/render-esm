/**
 * Convert argument in node cli into JavaScript object.
 * Accepts multiple formats.
 *
 * @param {process} process Currently running node process.
 * @returns {object[]} Array of process argument flag and value pairs.
 *
 * @example parseArgs(process)
 *
 */

export const parseArgs = _process => {
  if (!_process && !_process.argv) {
    throw new Error('not a valid node process.')
  }

  const args = {}
  let isValue = null

  _process.argv.slice(2).forEach(arg => {
    // is value for previous flag
    if (isValue) {
      args[isValue] = arg
      isValue = null
      return
    }

    // is flag
    if (arg.startsWith('--')) {
      if (arg.includes('=')) {
        // is flag with value pair
        const argv = arg.split('=')
        args[argv[0]] = argv[1]
      } else {
        // is flag without value pair
        // queue value will come next
        isValue = arg
      }
    }
  })

  return args
}

export default parseArgs
