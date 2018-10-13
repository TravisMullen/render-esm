/* eslint-env mocha */
/* global TEST_FILE: true, TEST_FILE_TYPE: true, TEST_DATA: false, loadModule: false, statSync: false, readFileSync: false, CreateESM: false, expect: true */
// expect,
// loadModule,
// statSync,
// readFileSync,
// CreateESM,
// TEST_FILE_TYPE,
// TEST_DATA
import { name } from '../package.json'

let testInstance

describe(`class ${name} generating new file`, function () {
  // before(function () {
  //   // check to be sure nothing was lingering
  //   // from a broken/stopped test
  //   purgeGeneratedFile(TEST_FILE)
  // })
  // beforeEach(function () {
  //   TEST_FILE = resolve(__dirname, `./some-test.${+(new Date())}.module.js`)
  //   console.log('TEST_FILE', TEST_FILE)
  // })
  // afterEach(`removing generated files from last test`, function () {
  //   // purge before we retest
  //   console.count('purged')
  //   purgeGeneratedFile(TEST_FILE)
  // })

  describe.skip('generate ESM file with CreateESM and resetModuleSync', function () {
    it('should create a ESM file matching name as first argument', function () {
      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      createESM.resetModuleSync()

      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(stats).to.be.a('object')
    })
    it('should a header that matches the second argument', function () {
      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      createESM.resetModuleSync()

      let file
      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(file.toString()).to.include(TEST_FILE_TYPE)
    })
  })

  describe.skip('generate ESM file with CreateESM and resetModuleSync with truthy third argument', function () {
    it('should create a ESM file matching name as first argument', async function () {
      await new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

      // createESM.resetModuleSync()

      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(stats).to.be.a('object')
    })
    it('should a header that matches the second argument', async function () {
      await new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

      // createESM.resetModuleSync()

      let file
      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(file.toString()).to.include(TEST_FILE_TYPE)
    })
  })

  describe.skip('generate ESM file with CreateESM and [async] resetModule', function () {
    it('should create a ESM file matching name as first argument', async function () {
      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      await createESM.resetModule()

      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(stats).to.be.a('object')
    })
    it('should a header that matches the second argument', async function () {
      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      await createESM.resetModule()

      let file
      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(file.toString()).to.include(TEST_FILE_TYPE)
    })
  })
  describe.skip('should generate ESM file with exports', function () {
    it('should throw Error if first argument no supplied', async function () {
    })
    it('should throw Error if first argument not string', async function () {
    })
    it('should throw Error if second argument no supplied', async function () {
    })
    it('should throw Error if second argument not string', async function () {
    })
  })
  describe('should generate ESM file with exports', function () {
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
        console.log(item, TEST_DATA[item])
        testInstance.addExportSync(item, TEST_DATA[item])
      }

      const exported = await loadModule(TEST_FILE)

      expect(Object.keys(exported)).to.have.lengthOf(Object.keys(TEST_DATA).length)
      for (const item of Object.keys(exported)) {
        expect(Object.keys(TEST_DATA)).to.include(item)
      }
    })

    it('should have all exports with assigned values', async function () {
      for (const item in TEST_DATA) {
        testInstance.addExportSync(item, TEST_DATA[item])
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
        testInstance.addExportSync(item, TEST_DATA[item])
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
        testInstance.addExportSync(item, TEST_DATA[item])
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
})
