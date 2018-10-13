import { writeFileSync, writeFile } from 'fs'
import camelcase from 'camelcase'

import { loadModule } from './load-module.js'

const resetModule = moduleName => {
  return [`/** ${moduleName} exports as es6 module */`, { flag: 'w' }]
}

/** @todo add validateModule = true */
/** @todo maintain queue of imports and call a final render of exports */
const addImport = (submodules, moduleName) => {
  // create JavaScript safe variable name
  const namedImport = camelcase(moduleName)
  // add definition to file
  const fileAddition = `
import { ${Array.isArray(submodules) ? submodules.join(', ') : submodules} } from ${namedImport}
  `
  return [fileAddition, { flag: 'a' }]
}

const defaultName = 'theDefaultExport'
const addExport = (key, value) => {
  let namedExport
  if (key === 'default') {
    namedExport = defaultName
  } else {
    // create JavaScript safe variable name
    namedExport = camelcase(key)
  }

  let exportValueAsString
  // check type, dont assume is a string
  if (typeof (value) === 'string') {
    if (value.includes('\n')) {
      // if there are line breaks than just wrap as template literal
      exportValueAsString = ['`', value, '`'].join('')
    } else {
      exportValueAsString = `'${value}'`
    }
  }

  let fileAddition
  if (typeof (value) === 'function') {
    fileAddition = `
export ${value.toString()}
`
  } else {
    fileAddition = `
export const ${namedExport} = ${exportValueAsString || value}
`
  }

  if (namedExport === defaultName) {
    fileAddition = fileAddition
      .replace('export ', '')
    if (typeof (value) === 'function') {
      fileAddition = fileAddition.concat(`
export default ${value.toString().match(/(?<=function )(.*)(?=\()/g)}
`)
    } else {
      fileAddition = fileAddition.concat(`
export default ${defaultName}
`)
    }
  }

  // add definition to file
  return [fileAddition, { flag: 'a' }]
}

/** @todo keep track of imports and error if an export was added that is not imported */
const addExports = submodules => {
  // add definition to file
  const fileAddition = `
export { ${Array.isArray(submodules) ? submodules.join(', ') : submodules} }
  `
  return [fileAddition, { flag: 'a' }]
}

class CreateESM {
  constructor (moduleFile, moduleType, resetModule = true) {
    if (typeof (moduleFile) !== 'string') {
      throw new TypeError('first argument is not a valid file path <String>')
    }
    if (typeof (moduleType) !== 'string') {
      throw new TypeError('second argument is not a valid file extension or substring <String>')
    }

    this.renderedExports = []
    this._moduleFile = moduleFile
    this._moduleType = moduleType

    if (resetModule) {
      this.resetModuleSync()
    }
  }

  resetModule () {
    const args = resetModule(this._moduleType)
    return new Promise((resolve, reject) => {
      writeFile(this._moduleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  resetModuleSync () {
    const args = resetModule(this._moduleType)
    return writeFileSync(this._moduleFile, ...args)
  }

  addImportSync (submodules, moduleName) {
    const args = addImport(submodules, moduleName)
    return writeFileSync(this._moduleFile, ...args)
  }

  addImport (submodules, moduleName) {
    const args = addImport(submodules, moduleName)
    return new Promise((resolve, reject) => {
      writeFile(this._moduleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async addRenderedExport (pathToModule, selectedExports = []) {
    if (typeof (pathToModule) !== 'string') {
      throw new TypeError('first argument is not a valid file path <String>')
    }

    console.log(Array.isArray(selectedExports), selectedExports)

    console.log(selectedExports.length, Object.values(selectedExports).filter(i => typeof (i) !== 'string').length)
    if (!Array.isArray(selectedExports)) {
      throw new TypeError('second argument should be Array of Strings <String[]>')
    }

    if (selectedExports.length && Object.values(selectedExports).filter(i => typeof (i) !== 'string').length) {
      throw new TypeError('second argument contains a non-String in its Array <String[]>')
    }

    const rendered = await loadModule(pathToModule)

    for (const item in rendered) {
      this.renderedExports.push({
        [item]: rendered[item]
      })
      await this.addExport(item, rendered[item])
    }
  }

  addExportSync (key, value) {
    const args = addExport(key, value)
    writeFileSync(this._moduleFile, ...args)
  }

  addExport (key, value) {
    const args = addExport(key, value)
    return new Promise((resolve, reject) => {
      writeFile(this._moduleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  addExportsSync (submodules) {
    const args = addExports(submodules)
    return writeFileSync(this._moduleFile, ...args)
  }

  addExports (submodules) {
    const args = addExports(submodules)
    return new Promise((resolve, reject) => {
      writeFile(this._moduleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

export default CreateESM
