/* eslint-disable constructor-super */

import camelcase from 'camelcase'

import RenderESM from './render-esm.js'

import {
  gatherFiles,
  getRawFileRoot
} from './gather-asset-files.js'

import {
  validateFindBy
} from './validate-arguments.js'
// import {
//   // gatherFiles,
//   getFileRoot
// } from './gather-asset-files.js'

// const defaultGlob = Object.freeze({
//   substring: 'js',
//   ext: true
// })

class BulkRenderESM extends RenderESM {
  constructor (...args) {
    // const asyncConstructor = async () => {
    super(...args)
    const [,, {
      render,
      extension,
      substring,
      path,
      paths
    }] = args

    this._targetFiles = new Set() // Set to aviod duplication

    /** @todo do more accurate absulute and relative path check */
    if (extension) {
      BulkRenderESM
        .findByExtension(extension)
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }

    if (substring) {
      BulkRenderESM
        .findBySubstring(substring)
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
      // console.log('substringsubstringsubstringsubstring', BulkRenderESM
      //   .findBySubstring(substring))
    }

    if (path) {
      // console.log('adding path', path)
      this._targetFiles.add(path)
    }

    if (paths) {
      // console.log('adding paths', paths)
      paths
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }

    // console.log('this._targetFiles', this._targetFiles)

    // console.log('BulkRenderESM - rendered!', render,
    //   paths)
    if (render) {
      console.log('render', render('hello world'))
    }
    // this._targetModules = modules
    // this._renderFunction = render
    // console.log( modules, render)
    // this.value = await Promise.resolve('any-value')
    // await this.init(modules)
    // console.log('done bulk!')
    // }
    // asyncConstructor()
    // this._modulesToTarget = modulesToTarget
    // this._customRenderFunction = customRenderFunction
    // console.log(this._modulesToTarget, this._customRenderFunction)
  }

  // async delayFunc () {

  // }

  // async doCustomRender (assetPath) {
  //   const exportName = RenderESM.createExportName(assetPath)

  //   console.time(`rendering:
  //     ${assetPath}
  //     as export: ${exportName}`)

  //   const data = await [this._customRenderFunction](assetPath)
  //   this._renderESM.addExportSync(exportName, data)

  //   console.timeEnd(`rendering:
  //     ${assetPath}
  //     as export: ${exportName}`)
  // }

  async doRender (assetPath) {
    // if (this._customRenderFunction &&
    //   typeof (this._customRenderFunction) === 'function') {
    //   await this.doCustomRender(assetPath)
    // } else {
    console.time(`rendering:
        ${assetPath}`)
    await this.addRenderedExport(assetPath)
    console.time(`rendering:
        ${assetPath}`)
    // }
  }

  async init () {
    console.time('render modules: ', this._targetFiles.size)
    for (const file of this._targetFiles) {
      console.time(`add export ${BulkRenderESM.createExportName(file)}`)
      await this.doRender(file)
      console.timeEnd(`add export ${BulkRenderESM.createExportName(file)}`)
    }
    console.timeEnd('render modules: ', this._targetFiles.size)

  //   // console.time('formate file')
  //   // this._renderESM.formateFile()
  //   // console.timeEnd('formate file')
  }

  static findByExtension (fileExtension) {
    const found = gatherFiles(fileExtension)
    if (validateFindBy(found, fileExtension)) {
      return found
    }
  }

  static findBySubstring (fileSubstring) {
    const found = gatherFiles(fileSubstring, true)
    if (validateFindBy(found, fileSubstring)) {
      return found
    }
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

// const runBulkRender = async (renderedModuleFile, substringToTarget, header = new Date()) => {
//   // const files = RenderESM.
//   const svgRenderESM = new BulkRenderESM(renderedModuleFile, header)
//   await svgRenderESM.init()
// }

// const runBulkCustomRender = async (renderedModuleFile, substringToTarget, customRenderFunction) => {
//   // const files = RenderESM.
//   const svgRenderESM = new BulkRenderESM(renderedModuleFile, substringToTarget, customRenderFunction)
//   await svgRenderESM.init()
// }
// export plugins
export default BulkRenderESM
