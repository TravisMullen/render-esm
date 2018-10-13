/* eslint-env mocha */

import 'babel-register'
import 'babel-polyfill'

import { resolve } from 'path'
import { readFileSync, statSync } from 'fs'
import { spawnSync } from 'child_process'

import { expect } from 'chai'

import { name } from '../package.json'

import CreateESM from '../src/build-esm-file.js'

import { loadModule } from './parse-modules.js'

const purgeGeneratedFile = filePath => {
  let stats
  try {
    stats = statSync(filePath)
  } catch (err) {
    // do nothing with error
    // as expected
  }
  // if found stat should be an Object
  if (typeof (stats) === 'object') {
    // purge before we begin
    spawnSync('rm', [filePath])
  }
}
let TEST_FILE
// const TEST_FILE = resolve(__dirname, `./some-test.${+(new Date())}.module.js`)
const TEST_FILE_TYPE = 'my generated file'

const someArrowFunction = () => 'Leggings taxidermy ennui.'
const TEST_DATA = Object.freeze({
  someString: 'Green juice taiyaki keytar.',
  anotherString: 'Butcher celiac distillery four dollar toast bespoke snackwave letterpress iPhone shabby chic hot chicken glossier.',
  someMoreString: 'Coloring book pabst pitchfork ennui lo-fi green juice taiyaki keytar.',
  yetAnotherString: 'Authentic single-origin coffee tousled 3 wolf moon butcher celiac distillery four dollar toast bespoke snackwave letterpress iPhone shabby chic hot chicken glossier.',
  someStringThatLooksLikeAFunction: `function (aParam) {
    return true
  }`,
  someFunction: function (aParam) {
    return `Typewriter ${aParam} kogi helvetica stumptown you probably haven't heard of them man braid.`
  },
  someShortHandFunction () {
    return 'Franzen tumblr cornhole hoodie bitters selfies helvetica tilde intelligentsia kickstarter mustache palo santo.'
  },
  someArrowFunction,
  someNumber: 123456,
  anotherNumber: 1234567,
  yetAnotherNumber: 12345671251231235245,
  someNumberAgain: 1233244562,
  anotherNumberAgain: 123456427,
  yetAnotherNumberAgain: 1234542367,
  someNull: null,
  someFalse: false,
  someTrue: true
})

let testInstance

describe(`class ${name} generating new file`, function () {
  // before(function () {
  //   // check to be sure nothing was lingering
  //   // from a broken/stopped test
  //   purgeGeneratedFile(TEST_FILE)
  // })
  beforeEach(function () {
    TEST_FILE = resolve(__dirname, `./some-test.${+(new Date())}.module.js`)
    console.log('TEST_FILE', TEST_FILE)
  })
  afterEach(`removing generated files from last test`, function () {
    // purge before we retest
    console.count('purged')
    purgeGeneratedFile(TEST_FILE)
  })

  describe.skip('generate ESM file with CreateESM and resetModuleSync', function () {
    it('should create a ESM file matching name as first argument', function () {
      const renderESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      renderESM.resetModuleSync()

      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(stats).to.be.a('object')
    })
    it('should a header that matches the second argument', function () {
      const renderESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      renderESM.resetModuleSync()

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

      // renderESM.resetModuleSync()

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

      // renderESM.resetModuleSync()

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
      const renderESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      await renderESM.resetModule()

      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        console.error(err)
      }

      expect(stats).to.be.a('object')
    })
    it('should a header that matches the second argument', async function () {
      const renderESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      await renderESM.resetModule()

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
      // const exported = await loadModule(path.resolve(__dirname, './some-test.module.js'))

      const exported = await loadModule(TEST_FILE)
      // delete exported.default
      // console.log('exported', exported)

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

    it.skip('should have all exports with matching key:value pairs', async function () {
      for (const item in TEST_DATA) {
        testInstance.addExportSync(item, TEST_DATA[item])
      }

      const exported = await loadModule(TEST_FILE)
      // delete exported['default']
      console.log(exported)
      for (const item in exported) {
        console.log(exported[item], TEST_FILE[item])
        expect(exported[item]).to.equal(TEST_FILE[item])
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
    // it('should have exports with in ESM file', async function () {
    //   const exported = await loadModule(path.resolve(__dirname, '../txt.module.js'))
    //   console.log('exported', exported, Object.keys(exported))
    //   expect(Object.keys(exported).length).to.be.gte(2)
    // })
    // it('should have base64 encoded exports from each file contents', async function () {
    //   const targetValues = []
    //   for (const item of targetFiles) {
    //     const result = readFileSync(path.resolve(__dirname, item))
    //     console.log('results', result.toString())
    //     targetValues.push(result.toString())
    //   }

    //   const exported = await loadModule(path.resolve(__dirname, '../txt.module.js'))

    //   for (const item in exported) {
    //     const decoded = decodeBase64(item)
    //     // console.log('decoded', decoded)

  //     expect(targetValues).to.contain(decoded)
  //   }
  // })
  })
})
