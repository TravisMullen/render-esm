
describe('generate an ECMAScript 6 module file with CreateESM and resetModuleSync', function () {
  it('should clean existing file when resetModuleSync is called', function () {
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

    createESM.resetModuleSync()

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).not.to.include(exportName)
    expect(file.toString()).not.to.include(exportValue)
    expect(file.toString()).to.include(TEST_FILE_TYPE)
  })

  it('should clean existing file [by default] when CreateESM is called on existing file', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

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

    createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).not.to.include(exportName)
    expect(file.toString()).not.to.include(exportValue)
    expect(file.toString()).to.include(TEST_FILE_TYPE)
  })

  it('should not clean existing file when CreateESM is called on existing file and third parameter is falsy', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

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

    createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, false)

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).to.include(exportName)
    expect(file.toString()).to.include(exportValue)
    expect(file.toString()).to.include(TEST_FILE_TYPE)
  })
  it('should clean existing file when CreateESM is called on existing file and third parameter is truthy', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

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

    createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

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
