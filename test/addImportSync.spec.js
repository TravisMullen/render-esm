
import { resolve } from 'path'

let testInstance

const imports = {
  someDefaultModule: './test/helpers/example-module-alpha.js',
  anotherDefaultModule: resolve(__dirname, `./helpers/example-module-beta.js`)
}

describe.skip('should generate an ECMAScript 6 module file with valid exports when calling addExportSync', function () {
  beforeEach(async function () {
    testInstance = await new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)
  })

  it('should have no exports until "addExportSync" is called', async function () {
    const exported = await loadModule(TEST_FILE)

    // if no valid exports will product "default: {}"

    expect(Object.keys(exported)).to.have.lengthOf(1)
    expect(Object.keys(exported)[0]).to.equal('default')
    // eslint-disable-next-line no-unused-expressions
    expect(Object.values(exported)[0]).to.be.an('object').that.is.empty
  })

  it('should have all exports as assigned modules', async function () {
    for (const item in TEST_DATA) {
      testInstance.addExportSync(item, TEST_DATA[item])
    }

    const exported = await loadModule(TEST_FILE)

    expect(Object.keys(exported)).to.have.lengthOf(Object.keys(TEST_DATA).length)
    for (const item of Object.keys(exported)) {
      expect(Object.keys(TEST_DATA)).to.include(item)
    }
  })
})
