
import { statSync } from 'fs'
import { spawnSync } from 'child_process'

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

/**
 * Delete file if exists.
 *
 * @public
 * @param {string} filePath Path to file.
 */
export const purgeFile = filePath => {
  if (checkFile(filePath)) {
    // purge before we begin
    spawnSync('rm', [filePath])
  }
}
