
describe('generate an ECMAScript 6 module file with CreateESM and [async] resetModule', function () {
  it('should clean existing file when [async] resetModule is called', async function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

    createESM.addExportSync(exportName, exportValue)

    let file

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).to.include(TEST_FILE_TYPE)
    expect(file.toString()).to.include(exportName)
    expect(file.toString()).to.include(exportValue)

    await createESM.resetModule()

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
