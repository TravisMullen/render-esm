
import { statSync } from 'fs'

/**
 * Does file exist.
 *
 * @public
 * @param {string} filePath Path to file.
 * @return {boolean} File is found. <true>
 */
export const checkFile = filePath => {
  let stats
  try {
    stats = statSync(filePath)
  } catch (err) {
    stats = err
  }
  return !(stats instanceof Error)
}
