
import { resolve } from 'path'

const someDefaultModule = resolve(__dirname, './modules/example-module-alpha.prerender.js')

let testInstance

describe('generate static exports when calling "addRenderedExport"', function () {
  beforeEach(function () {
    testInstance = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })
  })

  it('should have all exports from targeted module if not specified in second param of "addRenderedExport"', async function () {
    await testInstance.addRenderedExport(someDefaultModule)

    const exported = await loadModule(TEST_FILE)
    const targetedModule = await loadModule(someDefaultModule)

    expect(Object.keys(exported)).to.have.lengthOf(Object.keys(targetedModule).length, 'does not match same amount keys as target module')
    for (const item of Object.keys(exported)) {
      expect(Object.keys(targetedModule)).to.include(item)
    }
  })
  it('should have selected named export from targeted module if specified in second param of "addRenderedExport"', async function () {
    const selectedExport = 'renderedString'
    await testInstance.addRenderedExport(someDefaultModule, [selectedExport])

    const exported = await loadModule(TEST_FILE)

    const targetedModule = await loadModule(someDefaultModule)

    expect(exported[selectedExport]).to.equal(targetedModule[selectedExport], 'should match value of target module')
    // get non-selected keys from targetedModule and confirm they are not in exported
    for (const item of Object.keys(targetedModule).filter(i => i !== selectedExport)) {
      expect(Object.keys(exported)).not.to.include(item, 'should not have target module keys that were not selected')
    }
  })

  it('should have selected "default" export from targeted module if specified in second param of "addRenderedExport"', async function () {
    const selectedExport = 'default'
    await testInstance.addRenderedExport(someDefaultModule, [selectedExport])

    const exported = await loadModule(TEST_FILE)

    const targetedModule = await loadModule(someDefaultModule)

    expect(exported[selectedExport]).to.equal(targetedModule[selectedExport], 'should match value of target module')
    // get non-selected keys from targetedModule and confirm they are not in exported
    for (const item of Object.keys(targetedModule).filter(i => i !== selectedExport)) {
      expect(Object.keys(exported)).not.to.include(item, 'should not have target module keys that were not selected')
    }
  })

  it('should have selected export without dependencies module', async function () {
    const selectedExport = 'renderedString'
    await testInstance.addRenderedExport(someDefaultModule, [selectedExport])

    let file
    try {
      file = readFileSync(someDefaultModule)
    } catch (err) {
      file = err
    }

    expect(file.toString()).to.include('import', 'should have import(s) to confirm a dependency.')

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).not.to.include('import', 'should have no import(s) to confirm dependencies were removed [and values rendered].')
  })

  it('should finish incomplete promises', async function () {
    const somePromiseModule = resolve(__dirname, './modules/example-module-simulate-heavy-compute.prerender.js')
    await testInstance.addRenderedExport(somePromiseModule)

    const exported = await loadModule(TEST_FILE)
    const targetedModule = await loadModule(somePromiseModule)
    const finishedPromise = await targetedModule

    expect(Object.keys(exported)).to.have.lengthOf(Object.keys(finishedPromise).length, 'does not match same amount keys as target module')
    for (const item of Object.keys(exported)) {
      expect(Object.keys(finishedPromise)).to.include(item)
    }
  })
})
