
// import { resolve } from 'path'

// let testInstance

// const imports = {
//   someDefaultModule: '../test/helpers/example-module-prerender.js',
//   anotherDefaultModule: resolve(__dirname, `./helpers/example-module-alpha.js`)
// }

// describe.skip('should generate an ECMAScript 6 module file with valid exports when calling addExportSync', function () {
//   beforeEach(async function () {
//     testInstance = await new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)
//   })

//   it('should have all exports as assigned module if not specified in second param of addRenderedExport', async function () {
//     // for (const item in TEST_DATA) {
//     await testInstance.addRenderedExport(imports.someDefaultModule)
//     // }

//     const exported = await loadModule(TEST_FILE)

//     const validateModule = await loadModule(imports.someDefaultModule)

//     console.log('exported', exported)
//     console.log('testInstance', testInstance.renderedExports)
//     expect(Object.keys(exported)).to.have.lengthOf(Object.keys(validateModule).length)
//     for (const item of Object.keys(exported)) {
//       expect(Object.keys(validateModule)).to.include(item)
//     }
//   })
//   it('should have selected exports as assigned module if specified in second param of addRenderedExport', async function () {
//     const selectedExport = 'renderedString'
//     await testInstance.addRenderedExport(imports.someDefaultModule, [selectedExport])

//     const exported = await loadModule(TEST_FILE)

//     const validateModule = await loadModule(imports.someDefaultModule)

//     console.log('exported', exported)
//     console.log('testInstance', testInstance.renderedExports)
//     expect(exported[selectedExport]).to.equal(validateModule[selectedExport])
//     // get non-selected keys from validateModule and confirm they are not in exported
//     for (const item of Object.keys(validateModule).filter(i => i !== selectedExport)) {
//       expect(Object.keys(exported)).to.include(item, 'should not have target module keys that were nit selected')
//     }
//   })
//   it('should have selected export without dependencies module', async function () {
//     const selectedExport = 'renderedString'
//     await testInstance.addRenderedExport(imports.someDefaultModule, [selectedExport])

//     const exported = await loadModule(TEST_FILE)

//     const validateModule = await loadModule(imports.someDefaultModule)

//     console.log('exported', exported)
//     console.log('testInstance', testInstance.renderedExports)
//     expect(Object.keys(exported)).to.have.lengthOf(Object.keys(validateModule).length)
//     for (const item of Object.keys(exported)) {
//       expect(Object.keys(validateModule)).to.include(item)
//     }
//   })
// })
