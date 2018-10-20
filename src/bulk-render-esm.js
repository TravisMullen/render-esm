
import RenderESM from './render-esm.js'

// import {
//   // gatherFiles,
//   getFileRoot
// } from './gather-asset-files.js'

// const defaultGlob = Object.freeze({
//   substring: 'js',
//   ext: true
// })

class BulkRenderESM {
  constructor (renderedModule, modulesToTarget, customRenderFunction) {
    try {
      this._renderESM = new RenderESM(renderedModule, modulesToTarget, true)
    } catch (err) {
      console.error(err)
      // throw err
    }

    this._modulesToTarget = modulesToTarget
    this._customRenderFunction = customRenderFunction
    console.log(this._modulesToTarget, this._customRenderFunction)
  }

  async doCustomRender (assetPath) {
    const exportName = RenderESM.createExportName(assetPath)

    console.time(`rendering:
      ${assetPath}
      as export: ${exportName}`)

    const data = await [this._customRenderFunction](assetPath)
    this._renderESM.addExportSync(exportName, data)

    console.timeEnd(`rendering:
      ${assetPath}
      as export: ${exportName}`)
  }

  async doRender (assetPath) {
    // if (this._customRenderFunction &&
    //   typeof (this._customRenderFunction) === 'function') {
    //   await this.doCustomRender(assetPath)
    // } else {
    console.time(`rendering:
        ${assetPath}`)
    await this._renderESM.addRenderedExport(assetPath)
    console.time(`rendering:
        ${assetPath}`)
    // }
  }

  async init () {
    console.time('render modules: ', this._modulesToTarget.length)
    for (const file of this._modulesToTarget) {
      console.time(`add export ${file}`)
      await this.doRender(file)
      console.timeEnd(`add export ${file}`)
    }
    console.timeEnd('render modules: ', this._modulesToTarget.length)

    // console.time('formate file')
    // this._renderESM.formateFile()
    // console.timeEnd('formate file')
  }
}

// const runBulkRender = async (renderedModule, substringToTarget, header = new Date()) => {
//   // const files = RenderESM.
//   const svgRenderESM = new BulkRenderESM(renderedModule, header)
//   await svgRenderESM.init()
// }

const runBulkCustomRender = async (renderedModule, substringToTarget, customRenderFunction) => {
  // const files = RenderESM.
  const svgRenderESM = new BulkRenderESM(renderedModule, substringToTarget, customRenderFunction)
  await svgRenderESM.init()
}
// export plugins
export default runBulkCustomRender
