
import path from 'path'
import { spawnSync } from 'child_process'
import {
  writeFileSync,
  writeFile
} from 'fs'
import camelcase from 'camelcase'
/** bin called by a spawned process */
// import semistandard from 'semistandard'

import { isArrayOfStrings } from './validate-arguments.js'
import { loadModule } from './load-module.js'
import { checkFile } from './check-file.js'
import {
  gatherFiles,
  getRawFileRoot
} from './gather-asset-files.js'

// import runBulkRenderESM from './bulk-ender-esm.js'

/**
 * Override any pre-existing file, and append new header.
 *
 * @private
 * @param {string} exportType Type of exports contained in file.
 * @return {(string|Object)[]} An array with <string> to be appeneded to file, and options <Object> of [File System Flags](https://nodejs.org/api/fs.html#fs_file_system_flags) for `fs.writeFileSync`
 */
const resetModule = exportType => {
  return [`/** ${exportType} exports as es6 module */`, { flag: 'w', encoding: 'utf8', mode: 0o666 }]
}

/**
 * Append tagarted module files as external imports to file.
 *
 */
/** @todo add validateModule = true */
/** @todo maintain queue of imports and call a final render of exports */
// const addImport = (submodules, moduleName) => {
//   // create JavaScript safe variable name
//   const namedImport = camelcase(moduleName)
//   // add definition to file
//   const fileAddition = `
// import { ${Array.isArray(submodules) ? submodules.join(', ') : submodules} } from ${namedImport}
//   `
//   return [fileAddition, { flag: 'a', encoding: 'utf8', mode: 0o666 }]
// }

/**
 * Append named, or `default`, `export` to module file.
 * @todo Error on duplicate `default` assigment.
 * @todo Test anonymous functions.
 *
 * @private
 * @param {string} exportName Name of `export`, can be `default`.
 * @param {(Object|Array|Function|string|undefined)} exportValue Value of `export`.
 * @param {string} defaultName Non-functions are assigned to a `const` with this name. Functions will ignore this and use the named function.
 * @return {(string|Object)[]} An array with named, or default, `export` and value pair <string> to be appeneded to file, and options <Object> of [File System Flags](https://nodejs.org/api/fs.html#fs_file_system_flags) for `fs.writeFileSync`
 */
const addExport = (exportName, exportValue, defaultName = 'theDefaultExport') => {
  if (typeof (exportName) !== 'string') {
    throw new TypeError('first argument is not a valid export name <string>')
  }

  // check if is a `default` export
  let namedExport
  if (exportName === 'default') {
    namedExport = defaultName
  } else {
    // create JavaScript safe variable name
    namedExport = camelcase(exportName)
  }

  let exportValueAsString
  // check type, dont assume is a string
  if (typeof (exportValue) === 'string') {
    if (exportValue.includes('\n')) {
      // if there are line breaks than just wrap as template literal
      exportValueAsString = ['`', exportValue, '`'].join('')
    } else {
      exportValueAsString = `'${exportValue}'`
    }
  }

  // handle functions
  let fileAddition
  if (typeof (exportValue) === 'function') {
    fileAddition = `
export ${exportValue.toString()}
`
  } else {
    fileAddition = `
export const ${namedExport} = ${exportValueAsString || exportValue}
`
  }

  // if is a `default` than augment restring value
  // to remove `export` from `const` assigment
  // and add the `default export` assignment below
  // if is a named `function` use the name to declare the default assigment
  if (namedExport === defaultName) {
    fileAddition = fileAddition
      .replace('export ', '')
    if (typeof (exportValue) === 'function') {
      fileAddition = fileAddition.concat(`
export default ${exportValue.toString().match(/(?<=function )(.*)(?=\()/g)}
`)
    } else {
      fileAddition = fileAddition.concat(`
export default ${defaultName}
`)
    }
  }

  // add definition to file
  return [fileAddition, { flag: 'a', encoding: 'utf8', mode: 0o666 }]
}

/** @todo keep track of imports and error if an export was added that is not imported */
// const addExports = submodules => {
//   // add definition to file
//   const fileAddition = `
// export { ${Array.isArray(submodules) ? submodules.join(', ') : submodules} }
//   `
//   return [fileAddition, { flag: 'a', encoding: 'utf8', mode: 0o666 }]
// }

class RenderESM {
  constructor (renderedModuleFile, moduleHeader, resetModule = true) {
    if (typeof (renderedModuleFile) !== 'string') {
      throw new TypeError('first argument is not a valid file path <string>')
    }
    if (typeof (moduleHeader) !== 'string') {
      throw new TypeError('second argument is not a valid file extension or substring <string>')
    }

    /** `export` names and values rendered using `addRenderedExport`
      * @api public
      */
    this.renderedExports = []

    this._renderedModuleFile = renderedModuleFile
    this._moduleHeader = moduleHeader

    if (resetModule) {
      this.resetModuleSync()
    }

    // this.formateFile()
  }

  /**
   * Asynchronous method for `resetModule`
   *
   * @memberof RenderESM
   * @public
   * @api public
   * @see {@link resetModule}
   * @return {Promise}
   */
  resetModule () {
    const args = resetModule(this._moduleHeader)
    return new Promise((resolve, reject) => {
      writeFile(this._renderedModuleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * Synchronous method for `resetModule`
   *
   * @memberof RenderESM
   * @public
   * @api public
   * @see {@link resetModule}
   * @return {undefined}
   * @see {@link https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options}
   */
  resetModuleSync () {
    const args = resetModule(this._moduleHeader)
    return writeFileSync(this._renderedModuleFile, ...args)
  }

  /**
   * Synchronous method for `addImport`
   *
   * @memberof RenderESM
   * @public
   * @api public
   * @see {@link addImport}
   * @return {undefined}
   * @see {@link https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options}
   */
  // addImportSync (submodules, moduleName) {
  //   const args = addImport(submodules, moduleName)
  //   return writeFileSync(this._renderedModuleFile, ...args)
  // }

  // addImport (submodules, moduleName) {
  //   const args = addImport(submodules, moduleName)
  //   return new Promise((resolve, reject) => {
  //     writeFile(this._renderedModuleFile, ...args, err => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve()
  //       }
  //     })
  //   })
  // }

  /**
   * Asynchronous method for `resetModule`
   *
   * @memberof RenderESM
   * @async
   * @public
   * @api public
   * @see {@link addExport}
   * @param {string} pathToModule Module to be rendered and results assigned to exports in newly created module.
   * @param {string[]} selectedExports Array of named exports to be selected from loaded module. exports not included in Array will be dropped. If left blank (default), all named exports, and default, will be included.
   * @return {Promise}
   */
  async addRenderedExport (pathToModule, selectedExports = []) {
    if (typeof (pathToModule) !== 'string') {
      throw new TypeError('first argument is not a valid file path <string>')
    }

    // validate second argument
    isArrayOfStrings(selectedExports, 'second')

    const rendered = await loadModule(pathToModule)

    for (const item in rendered) {
      // if has selectedExports
      // and they dont match, skip
      if (selectedExports.length &&
        selectedExports.indexOf(item) === -1) {
        continue
      }
      if (this.renderedExports[item]) {
        throw new Error(`export ${item} was already was addded.`)
      }
      this.renderedExports.push({
        [item]: rendered[item]
      })
      await this.addExport(item, rendered[item])
    }
  }

  /**
   * Synchronous method for `addExport`
   *
   * @memberof RenderESM
   * @public
   * @api public
   * @see {@link addExport}
   * @return {undefined}
   * @see {@link https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options}
   */
  addExportSync (exportName, exportValue) {
    const args = addExport(exportName, exportValue)
    return writeFileSync(this._renderedModuleFile, ...args)
  }

  /**
   * Asynchronous method for `addExport`
   *
   * @memberof RenderESM
   * @public
   * @api public
   * @see {@link addExport}
   * @return {Promise}
   */
  addExport (exportName, exportValue) {
    const args = addExport(exportName, exportValue)
    return new Promise((resolve, reject) => {
      writeFile(this._renderedModuleFile, ...args, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  // addExportsSync (submodules) {
  //   const args = addExports(submodules)
  //   return writeFileSync(this._renderedModuleFile, ...args)
  // }

  // addExports (submodules) {
  //   const args = addExports(submodules)
  //   return new Promise((resolve, reject) => {
  //     writeFile(this._renderedModuleFile, ...args, err => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve()
  //       }
  //     })
  //   })
  // }

  formate () {
    RenderESM.formateFile(this._renderedModuleFile)
  }

  // utils

  static formateFile (filePath) {
    // format (add semi-colons)
    // process.on('beforeExit', code => {
    // if (code === 0) {
    if (checkFile(filePath)) {
      spawnSync('node', [
        path.resolve(__dirname, '../node_modules/semistandard/bin/cmd.js'),
        '--fix',
        this._renderedModuleFile
      ])
    }
    // }
    // })
  }

  static findByExtension (fileExtension) {
    return gatherFiles(fileExtension)
  }

  static findBySubstring (fileSubstring) {
    return gatherFiles(fileSubstring, true)
  }

  /**
   * Create a export name from file path/name.
   * Gets root name file path and make its `camelCase` style.
   *
   * param {string} filePath File extension
   * @param {string} extensionOrSubstring File extension, or substring.
   * @return {string} `camelCased` name of file without extension, or anything after subtring.
   */
  static createExportName (filePath, extensionOrSubstring) {
    return camelcase(
      getRawFileRoot(filePath, extensionOrSubstring)
    )
  }
}

export default RenderESM
