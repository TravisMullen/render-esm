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
  describe(`generate an ECMAScript 6 module file with RenderESM and ${functionName}`, function () {
    it(`should clean existing file when ${functionName} is called`, async function () {
      const exportName = 'someExportName'
      const exportValue = 'someExportValue'

      const renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })

      renderESM.addExportSync(exportName, exportValue)

      let file

      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        file = err
      }

      expect(file.toString()).to.include(TEST_FILE_TYPE)
      expect(file.toString()).to.include(exportName)
      expect(file.toString()).to.include(exportValue)

      await renderESM[functionName]()

      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        file = err
      }

      expect(file.toString()).not.to.include(exportName)
      expect(file.toString()).not.to.include(exportValue)
      expect(file.toString()).to.include(TEST_FILE_TYPE)
    })
  })
}

export default sharedTests
