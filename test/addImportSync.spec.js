
import { resolve } from 'path'

const someDefaultModule = resolve(__dirname, './example-modules/example-module-prerender.js')

let testInstance

describe.skip(`import target modules as live bindings using "addImportSync"`, function () {
  beforeEach(function () {
    testInstance = new RenderESM(TEST_FILE, TEST_FILE_TYPE, true)
  })

  it('should be able to import named exports from target module', async function () {
    await testInstance.addImportSync(someDefaultModule)

    const exported = await loadModule(TEST_FILE)
    const targetedModule = await loadModule(someDefaultModule)

    expect(Object.keys(exported)).to.have.lengthOf(Object.keys(targetedModule).length, 'does not match same amount keys as target module')
    for (const item of Object.keys(exported)) {
      expect(Object.keys(targetedModule)).to.include(item)
    }
  })

  it('should be able to import default export from target module', async function () {

  })
  it('should be able to import default export and named exports from target module', async function () {

  })
  it('should optionally validate import modules exist', async function () {

  })
})
