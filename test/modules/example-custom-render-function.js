
import {
  readFileSync
} from 'fs'

import camelcase from 'camelcase'

/**
 * `camelCase` a body of text.
 * @param  {string} path        Path to TXT file.
 * @return {string}             Updated text.
 */
export const camelCaseJawn = (path) => {
  const data = readFileSync(path, 'utf8')
  return camelcase(
    data.toString()
  )
}
