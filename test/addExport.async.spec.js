
let testInstance

describe('should generate an ECMAScript 6 module file with valid exports when calling [async] addExport', function () {
  beforeEach(async function () {
    testInstance = await new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)
  })

  it('should have no exports until "addExport" is called', async function () {
    const exported = await loadModule(TEST_FILE)

    // if no valid exports will product "default: {}"

    expect(Object.keys(exported)).to.have.lengthOf(1)
    expect(Object.keys(exported)[0]).to.equal('default')
    // eslint-disable-next-line no-unused-expressions
    expect(Object.values(exported)[0]).to.be.an('object').that.is.empty
  })

  it('should have all exports with assigned keys', async function () {
    for (const item in TEST_DATA) {
      await testInstance.addExport(item, TEST_DATA[item])
    }

    const exported = await loadModule(TEST_FILE)

    expect(Object.keys(exported)).to.have.lengthOf(Object.keys(TEST_DATA).length)
    for (const item of Object.keys(exported)) {
      expect(Object.keys(TEST_DATA)).to.include(item)
    }
  })

  it('should have all exports with assigned values', async function () {
    for (const item in TEST_DATA) {
      await testInstance.addExport(item, TEST_DATA[item])
    }

    const exported = await loadModule(TEST_FILE)

    expect(Object.values(exported)).to.have.lengthOf(Object.values(TEST_DATA).length)

    for (const item in exported) {
      if (typeof (exported[item]) === 'function') {
        const someArgumentValue = 'hello world'
        expect(TEST_DATA[item](someArgumentValue)).to.equal(exported[item](someArgumentValue))
      } else {
        expect(TEST_DATA[item]).to.equal(exported[item])
      }
    }
  })

  it('should have all exports with matching key:value pairs', async function () {
    for (const item in TEST_DATA) {
      await testInstance.addExport(item, TEST_DATA[item])
    }

    const exported = await loadModule(TEST_FILE)

    expect(Object.values(exported)).to.have.lengthOf(Object.values(TEST_DATA).length)

    for (const item in TEST_DATA) {
      if (typeof (TEST_DATA[item]) === 'function') {
        const someArgumentValue = 'hello world'
        expect(TEST_DATA[item](someArgumentValue)).to.equal(exported[item](someArgumentValue))
      } else {
        expect(TEST_DATA[item]).to.equal(exported[item])
      }
    }
  })

  it('should have all exports with same types', async function () {
    const CHECK_TYPES = [
      'function',
      'boolean',
      'string',
      'number',
      'null' // null will actually find 0 but that not a huge concern right now
    ]
    // this is a control to confirm
    // there are not two types with the same count
    const uniqueTypeCounts = []

    for (const item in TEST_DATA) {
      await testInstance.addExport(item, TEST_DATA[item])
    }

    const exported = await loadModule(TEST_FILE)

    for (const toCheck of CHECK_TYPES) {
      // eslint-disable-next-line valid-typeof
      const expectedTypes = Object.values(TEST_DATA).filter(i => typeof (i) === toCheck).length
      // control check
      expect(uniqueTypeCounts).not.to.include(expectedTypes)
      uniqueTypeCounts.push(expectedTypes)

      // eslint-disable-next-line valid-typeof
      const foundTypes = Object.values(exported).filter(i => typeof (i) === toCheck).length
      expect(foundTypes.length).to.equal(expectedTypes.length)
    }
  })
})
