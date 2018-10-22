
// import { sync as globSync } from 'glob'
// import { createNodeProjectGlob } from '../src/gather-asset-files.js'
import { resolve } from 'path'

// const magicGlob = createNodeProjectGlob()

const someDefaultModule = resolve(__dirname, './example-modules/example-module-prerender.js')

// let testInstance

describe.skip('generate static exports when calling "addBulkRenderedExport"', function () {
  // beforeEach(function () {
  //   testInstance = new bulkRenderESM(TEST_FILE)
  // })

  // it('should have all exports from targeted module if not specified in second param of "addRenderedExport"', async function () {
  //   await bulkRenderESM(TEST_FILE)

  //   const exported = await loadModule(TEST_FILE)
  //   const targetedModule = await loadModule(someDefaultModule)

  //   // expect(Object.keys(exported)).to.have.lengthOf(Object.keys(targetedModule).length, 'does not match same amount keys as target module')
  //   for (const item of exported) {
  //     expect(Object.keys(targetedModule)).to.include(item)
  //   }
  // })
  // it('should have selected named export from targeted module if specified in second param of "addRenderedExport"', async function () {
  //   const selectedExport = 'renderedString'
  //   await testInstance.addRenderedExport(someDefaultModule, [selectedExport])

  //   const exported = await loadModule(TEST_FILE)

  //   const targetedModule = await loadModule(someDefaultModule)

  //   expect(exported[selectedExport]).to.equal(targetedModule[selectedExport], 'should match value of target module')
  //   // get non-selected keys from targetedModule and confirm they are not in exported
  //   for (const item of Object.keys(targetedModule).filter(i => i !== selectedExport)) {
  //     expect(Object.keys(exported)).not.to.include(item, 'should not have target module keys that were not selected')
  //   }
  // })

  // it('should have selected "default" export from targeted module if specified in second param of "addRenderedExport"', async function () {
  //   const selectedExport = 'default'
  //   await testInstance.addRenderedExport(someDefaultModule, [selectedExport])

  //   const exported = await loadModule(TEST_FILE)

  //   const targetedModule = await loadModule(someDefaultModule)

  //   expect(exported[selectedExport]).to.equal(targetedModule[selectedExport], 'should match value of target module')
  //   // get non-selected keys from targetedModule and confirm they are not in exported
  //   for (const item of Object.keys(targetedModule).filter(i => i !== selectedExport)) {
  //     expect(Object.keys(exported)).not.to.include(item, 'should not have target module keys that were not selected')
  //   }
  // })

  it('should throw error', async function () {
    const subname = 'example-mode'
    // const render = jawn => `This is the ${jawn}`
    // await testInstance.addRenderedExport(someDefaultModule, [selectedExport])
    // await bulkRenderESM(TEST_FILE, selectedSubstring)
    const testInstance = new AdvanedRenderESM(TEST_FILE, {
      header: TEST_FILE_TYPE
    },
    {
      // render: jawn => `String: ${jawn}`,
      paths: [someDefaultModule],
      subname
    }
    )
    console.log('testInstance', testInstance)
    // let file
    // const someDefaultModules = globSync(createNodeProjectGlob(subname, true))
    // const someDefaultModules = AdvanedRenderESM.findBySubstring(subname)

    // console.log('someDefaultModules', someDefaultModules)
    // // try {
    // //   file = readFileSync(someDefaultModule)
    // // } catch (err) {
    // //   file = err
    // // }
    // //
    // let targetedModules = []
    // for (const filePath of someDefaultModules) {
    //   targetedModules = targetedModules.concat(await loadModule(resolve(__dirname, '..', filePath)))
    // }
    // // const targetedModules = targetedModules
    // console.log('targetedModules', targetedModules)

    // const exported = await loadModule(TEST_FILE)

    // console.log('exported', exported)
    // expect(Object.keys(exported)).to.have.lengthOf(Object.keys(targetedModules).length, 'does not match same amount keys as target module')
    // for (const item of exported) {
    //   expect(Object.keys(targetedModules)).to.include(item)
    // }

    // try {
    //   file = readFileSync(TEST_FILE)
    // } catch (err) {
    //   file = err
    // }

    // expect(file.toString()).not.to.include('import', 'should have no import(s) to confirm dependencies were removed [and values rendered].')
  })
})
