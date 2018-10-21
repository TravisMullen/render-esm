
import { sync as globSync } from 'glob'
// import { createNodeProjectGlob } from '../src/gather-asset-files.js'
import { resolve, parse } from 'path'

// const magicGlob = createNodeProjectGlob()

const someDefaultModule = resolve(__dirname, './modules/example-module-alpha.prerender.js')

// let testInstance

const validateGeneratedFiles = (bulkOptions, targetModuleFiles) => {
  const header = `[${Object.keys(bulkOptions)}]`
  describe(`should render all exports from target module files using ${header} options`, async function () {
    beforeEach(async function () {
      const testInstance = new BulkRenderESM(
        TEST_FILE,
        {
          header
        },
        bulkOptions
      )

      await testInstance.init()
    })
    it('should have all exports from each targeted module file', async function () {
      for (const targetModuleFile of targetModuleFiles) {
        const exported = await loadModule(TEST_FILE)
        const targetedModule = await loadModule(targetModuleFile)

        const { name } = parse(targetModuleFile)
        console.log(`Validating: ${name}`)

        for (const item of Object.keys(targetedModule)) {
          expect(Object.keys(exported)).to.include(item)
        }
      }
    })
    it('should have selected export without dependencies module', async function () {
      let file
      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        file = err
      }

      expect(file.toString()).not.to.include('import', 'should have no import(s) to confirm dependencies were removed [and values rendered].')
    })
  })
}

validateGeneratedFiles(
  {
    path: someDefaultModule
  },
  [someDefaultModule]
)

validateGeneratedFiles(
  {
    paths: [someDefaultModule]
  },
  [someDefaultModule]
)

const substringModules = globSync(resolve(__dirname, '{,!(node_modules)/**/}*prerender*'))

validateGeneratedFiles(
  {
    paths: substringModules
  },
  substringModules
)

validateGeneratedFiles(
  {
    substring: 'prerender'
  },
  substringModules
)

// todo test content not modules!

// const extensionModules = globSync(resolve(__dirname, '{,!(node_modules)/**/}*.txt'))

//   describe.only(`should render all exports from target module files using "${Object.keys(bulkOptions)}" options`, async function () {
//     beforeEach(async function () {
//       const testInstance = new BulkRenderESM(
//         TEST_FILE,
//         {
//           header: TEST_FILE_TYPE
//         },
//         bulkOptions
//       )

//       await testInstance.init()
//     })
//     it('should have all exports from each targeted module file', async function () {
//       for (const targetModuleFile of targetModuleFiles) {
//         const exported = await loadModule(TEST_FILE)
//         const targetedModule = await loadModule(targetModuleFile)
//         console.log(`Validating: ${targetModuleFile}`)
//         for (const item of Object.keys(targetedModule)) {
//           expect(Object.keys(exported)).to.include(item)
//         }
//       }
//     })
//     it('should have selected export without dependencies module', async function () {
//       let file
//       try {
//         file = readFileSync(TEST_FILE)
//       } catch (err) {
//         file = err
//       }

//       expect(file.toString()).not.to.include('import', 'should have no import(s) to confirm dependencies were removed [and values rendered].')
//     })
//   })
