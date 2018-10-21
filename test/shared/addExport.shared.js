/**
 * For testing same funcationality between both `sync` and `async` methods.
 * `await` can handle a non-promise so this will work the same for syncronous.
 *
 * @param {string} functionName Name of method to test against.
 *
 * @example sharedTests('addExport') // @returns <Promise>
 * @example sharedTests('addExportSync') // blocks event loop, returns nothing
 *
 */
const sharedTests = functionName => {
  let testInstance

  describe(`generate default and named exports when calling ${functionName}`, function () {
    beforeEach(function () {
      testInstance = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })
    })

    it(`should have no exports until "${functionName}" is called`, async function () {
      const exported = await loadModule(TEST_FILE)

      // if no valid exports will product "default: {}"

      expect(Object.keys(exported)).to.have.lengthOf(1)
      expect(Object.keys(exported)[0]).to.equal('default')
      // eslint-disable-next-line no-unused-expressions
      expect(Object.values(exported)[0]).to.be.an('object').that.is.empty
    })

    it('should have all named exports', async function () {
      for (const item in TEST_DATA) {
        await testInstance[functionName](item, TEST_DATA[item])
      }

      const exported = await loadModule(TEST_FILE)

      expect(Object.keys(exported)).to.have.lengthOf(Object.keys(TEST_DATA).length)
      for (const item of Object.keys(exported)) {
        expect(Object.keys(TEST_DATA)).to.include(item)
      }
    })

    it('should have all values', async function () {
      for (const item in TEST_DATA) {
        await testInstance[functionName](item, TEST_DATA[item])
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

    it('should match each named exports\' key with value', async function () {
      for (const item in TEST_DATA) {
        await testInstance[functionName](item, TEST_DATA[item])
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

    it('should have same amount of types (validate none were changed)', async function () {
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
        await testInstance[functionName](item, TEST_DATA[item])
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

    it('should be able to assign a function as a single default export', async function () {
      const exportName = 'default'
      const exportValue = TEST_DATA.someFunction
      const someArgument = 'hello world'

      await testInstance[functionName](exportName, exportValue)

      const exported = await loadModule(TEST_FILE)

      expect(Object.values(exported)).to.have.lengthOf(1)
      expect(exported[exportName](someArgument)).to.equal(exportValue(someArgument))
    })

    it('should be able to assign a string as a single default export', async function () {
      const exportName = 'default'
      const exportValue = TEST_DATA.someString

      await testInstance[functionName](exportName, exportValue)

      const exported = await loadModule(TEST_FILE)

      expect(Object.values(exported)).to.have.lengthOf(1)
      expect(exported[exportName]).to.equal(exportValue)
    })

    it('should be able to assign a function as a default export with other named exports', async function () {
      const defaultExportTarget = 'someFunction'
      const defaultExportName = 'default'

      for (const item in TEST_DATA) {
        // make someString the default
        if (item === defaultExportTarget) {
          await testInstance[functionName](defaultExportName, TEST_DATA[item])
        } else {
          await testInstance[functionName](item, TEST_DATA[item])
        }
      }

      const exported = await loadModule(TEST_FILE)

      expect(Object.values(exported)).to.have.lengthOf(Object.values(TEST_DATA).length)

      const someArgumentValue = 'hello world'
      for (const item in TEST_DATA) {
        if (item === defaultExportTarget) {
          expect(TEST_DATA[defaultExportTarget](someArgumentValue)).to.equal(exported[defaultExportName](someArgumentValue))
        } else {
          if (typeof (TEST_DATA[item]) === 'function') {
            expect(TEST_DATA[item](someArgumentValue)).to.equal(exported[item](someArgumentValue))
          } else {
            expect(TEST_DATA[item]).to.equal(exported[item])
          }
        }
      }
    })

    it('should be able to assign a string as a default export with other named exports', async function () {
      const defaultExportTarget = 'someString'
      const defaultExportName = 'default'

      for (const item in TEST_DATA) {
        // make someString the default
        if (item === defaultExportTarget) {
          await testInstance[functionName](defaultExportName, TEST_DATA[item])
        } else {
          await testInstance[functionName](item, TEST_DATA[item])
        }
      }

      const exported = await loadModule(TEST_FILE)

      expect(Object.values(exported)).to.have.lengthOf(Object.values(TEST_DATA).length)

      const someArgumentValue = 'hello world'
      for (const item in TEST_DATA) {
        if (item === defaultExportTarget) {
          expect(TEST_DATA[defaultExportTarget]).to.equal(exported[defaultExportName])
        } else {
          if (typeof (TEST_DATA[item]) === 'function') {
            expect(TEST_DATA[item](someArgumentValue)).to.equal(exported[item](someArgumentValue))
          } else {
            expect(TEST_DATA[item]).to.equal(exported[item])
          }
        }
      }
    })
  })
}

export default sharedTests
