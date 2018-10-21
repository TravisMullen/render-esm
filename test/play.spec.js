/* eslint-disable constructor-super */

// import { sync as globSync } from 'glob'
// import { createNodeProjectGlob } from '../src/gather-asset-files.js'
// import { resolve } from 'path'

// const someDefaultModule = resolve(__dirname, './example-modules/example-module-prerender.js')

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

  it('should have selected export without dependencies module', async function () {
    async function foo (value) {
      // Return async result async
      return new Promise(resolve => {
        setTimeout(() => resolve(value), 100)
      })
    }

    class SuperClass {
      async getValue (value) {
        var result = await foo(value)
        return this.value + ' ' + result
      }
    }

    class BaseClass extends SuperClass {
      constructor (value) {
        var asyncWrapperForSuper = async () => {
          super()
          this.value = await Promise.resolve('any-value')
        }
        asyncWrapperForSuper()
      }
    }

    const obj = new BaseClass('hello')

    const result = await obj.getValue('boo')
    console.log('result', result)

    // expect(file.toString()).not.to.include('import', 'should have no import(s) to confirm dependencies were removed [and values rendered].')
  })
})
