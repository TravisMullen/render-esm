
import { spawnSync } from 'child_process'

export const whichBase64 = _process => {
  // check for base64 installed on system.
  const { stdout } = spawnSync('which', ['base64'])

  if (!stdout.toString()) {
    console.log(`
  This system does not have base64 installed.
  `)
    if (_process && _process.exit) {
      _process.exit(1)
    }
  }
}

export const base64encode = filePath => {
  // do the dirty work
  const { stdout } = spawnSync('base64', [filePath])
  // convert buffer to string

  if (stdout.toString) {
    return stdout
      .toString()
      .trim()
  } else {
    return stdout
  }
}
