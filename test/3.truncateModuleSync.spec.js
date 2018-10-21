
import truncateModuleTests from './shared/truncateModule.shared.js'

/** @see tests in ./shared */
truncateModuleTests('truncateModuleSync')

describe('generate an ECMAScript 6 module file with RenderESM and truncateModuleSync from constructor', function () {
  it('should clean existing file [by default] when RenderESM is called on existing file', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })

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

    renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).not.to.include(exportName)
    expect(file.toString()).not.to.include(exportValue)
    expect(file.toString()).to.include(TEST_FILE_TYPE)
  })

  it('should not clean existing file when RenderESM is called on existing file and third parameter is falsy', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })

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

    renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE, truncate: false })

    try {
      file = readFileSync(TEST_FILE)
    } catch (err) {
      file = err
    }

    expect(file.toString()).to.include(exportName)
    expect(file.toString()).to.include(exportValue)
    expect(file.toString()).to.include(TEST_FILE_TYPE)
  })
  it('should clean existing file when RenderESM is called on existing file and third parameter is truthy', function () {
    const exportName = 'someExportName'
    const exportValue = 'someExportValue'

    let renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE, truncate: true })

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

    renderESM = new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE, truncate: true })

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
