import { writeFileSync, writeFile } from 'fs'
import camelcase from 'camelcase'

const resetModule = moduleName => {
  return [`/** ${moduleName} exports as es6 module */`, { flag: 'w' }]
}

const addImport = (submodules, moduleName) => {
  // create JavaScript safe variable name
  const namedImport = camelcase(moduleName)
  // add definition to file
  const fileAddition = `
import { ${Array.isArray(submodules) ? submodules.join(', ') : submodules} } from ${namedImport}
  `
  return [fileAddition, { flag: 'a' }]
}

const addExport = (key, value) => {
  // create JavaScript safe variable name
  const namedExport = camelcase(key)

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
    // exportValue = value.toString()
    // if (exportValue.includes('function')) {
    //   exportValue = value.toString()
    //     .replace('function ', '')
    // }
    // exportValue = value.toString()
    //   .replace(')', ') =>')
    fileAddition = `
export ${value.toString()}
  `
  } else {
    fileAddition = `
export const ${namedExport} = ${exportValueAsString || value}
  `
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
  constructor (moduleFile, moduleType, resetModule = false) {
    if (typeof (moduleFile) !== 'string') {
      throw new TypeError('first argument is not a valid file path [string]')
    }
    if (typeof (moduleType) !== 'string') {
      throw new TypeError('second argument is not a valid file extension or substring [string]')
    }

    this._moduleFile = moduleFile
    this._moduleType = moduleType

    if (resetModule) {
      // if (resetModule === 'sync') {
      return this.resetModuleSync()
      // } else {
      // return this.resetModule()
      // }
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

  addExportSync (key, value) {
    const args = addExport(key, value)
    writeFileSync(this._moduleFile, ...args)
  }

  addExport (key, value) {
    const args = addExport(key, value)
    console.log('args', args)
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
