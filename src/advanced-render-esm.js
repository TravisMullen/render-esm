/* eslint-disable constructor-super */

import camelcase from 'camelcase'

import BaseRenderESM from './base-render-esm.js'

import {
  gatherFiles,
  gatherFilesFromGlob,
  getRawFileRoot
} from '../lib/gather-asset-files.js'

import {
  validateFindBy
} from './validate-arguments.js'

class RenderESM extends BaseRenderESM {
  constructor (...args) {
    super(...args)
    const [,, {
      /**
       * Render Function
       */
      render,
      /**
       * Various ways to assign target files/modules.
       */
      extension,
      substring,
      glob,
      path,
      paths
    } = {}] = args

    if (render &&
      typeof (render) === 'function') {
      this._renderFunction = render
    }

    this._targetFiles = new Set() // Set to aviod duplication

    /** @todo do more accurate absulute and relative path check */
    /** use switch for this? */
    if (glob) {
      RenderESM
        .findByGlob(glob)
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }

    if (extension) {
      RenderESM
        .findByExtension(extension)
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }

    if (substring) {
      RenderESM
        .findBySubstring(substring)
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }

    if (path) {
      this._targetFiles.add(path)
    }

    if (paths) {
      paths
        .forEach(item => {
          this._targetFiles.add(
            item
          )
        })
    }
  }

  async _doCustomRender (assetPath) {
    const exportName = RenderESM.createExportName(assetPath)
    if (this.renderedExports[exportName]) {
      throw new Error(`export ${exportName} was already was added.`)
    }

    const data = await this._renderFunction(assetPath)

    this.renderedExports[exportName] = data
    this.addExportSync(exportName, data)
  }

  async _doRender (assetPath) {
    await this.addRenderedExport(assetPath)
  }

  async init () {
    const renderType = this._renderFunction
      ? '_doCustomRender'
      : '_doRender'

    console.time('render modules: ', this._targetFiles.size)
    for (const file of this._targetFiles) {
      await this[renderType](file)
    }
    console.timeEnd('render modules: ', this._targetFiles.size)
  }

  static findByGlob (glob) {
    const found = gatherFilesFromGlob(glob)
    if (validateFindBy(found, glob)) {
      return found
    }
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

export default RenderESM
