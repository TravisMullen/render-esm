
import { sync as globSync } from 'glob'
import { resolve } from 'path'
import camelcase from 'camelcase'
import {
  readFileSync
} from 'fs'

const renderModule = resolve(__dirname, 'modules', 'example-custom-render-function.js')
const txtFiles = globSync(resolve(__dirname, '{,!(node_modules)/**/}*.txt'))

describe('generate static exports when calling "addRenderedExport"', function () {
  it('should have all exports from "extension" option', async function () {
    const { camelCaseJawn } = await loadModule(renderModule)

    const testInstance = new BulkRenderESM(
      TEST_FILE,
      {
        header: 'Camel Case Jawn!'
      },
      {
        render: camelCaseJawn,
        extension: '.txt'
      }
    )

    await testInstance.init()

    const exported = await loadModule(TEST_FILE)
    expect(Object.keys(exported)).to.have.lengthOf(txtFiles.length, 'does not match same amount found target files')

    for (const file of txtFiles) {
      const data = readFileSync(file, 'utf8')
      console.log('data', data)
      expect(
        Object.values(exported).join(',')
      ).to.include(
        camelcase(data.toString())
      )
    }
  })
  it('should have all exports from "substring" option', async function () {
    const { camelCaseJawn } = await loadModule(renderModule)

    const testInstance = new BulkRenderESM(
      TEST_FILE,
      {
        header: 'Camel Case Jawn!'
      },
      {
        render: camelCaseJawn,
        substring: 'camelcaseme'
      }
    )

    await testInstance.init()

    const exported = await loadModule(TEST_FILE)
    expect(Object.keys(exported)).to.have.lengthOf(txtFiles.length, 'does not match same amount found target files')

    for (const file of txtFiles) {
      const data = readFileSync(file, 'utf8')
      console.log('data', data)
      expect(
        Object.values(exported).join(',')
      ).to.include(
        camelcase(data.toString())
      )
    }
  })
})
