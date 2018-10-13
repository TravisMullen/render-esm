
import { statSync } from 'fs'
import { spawnSync } from 'child_process'

export const purgeGeneratedFile = filePath => {
  let stats
  try {
    stats = statSync(filePath)
  } catch (err) {
    // do nothing with error
    // as expected
  }
  // if found stat should be an Object
  if (typeof (stats) === 'object') {
    // purge before we begin
    spawnSync('rm', [filePath])
  }
}
