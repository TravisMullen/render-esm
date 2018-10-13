/* eslint-env mocha */

import 'babel-register'
import 'babel-polyfill'

import { swap, restore } from 'swap-global'

import { resolve } from 'path'
import { readFileSync, statSync } from 'fs'
import { expect } from 'chai'

import { loadModule } from '../src/load-module.js'
import { purgeGeneratedFile } from './helpers/purge-file.js'

import CreateESM from '../src/build-esm-file.js'

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

/** After all test cases are started. */
before('Assigning functions as global properties.', async () => {
  const definitions = {
    expect,
    loadModule,
    statSync,
    readFileSync,
    CreateESM,
    TEST_FILE_TYPE,
    TEST_DATA
  }
  /** Assign global variables
    * @see {@link} https://www.npmjs.com/package/swap-global
    */
  for (const property in definitions) {
    console.log(`defining ${property} as global.`)
    swap(property, definitions[property])
  }
})

let TEST_FILE
let count = 0
// create a uniquely named file for each test so
// it is not cached by dynamic imports
beforeEach(function () {
  TEST_FILE = resolve(__dirname, `./some-test.${+(new Date())}.${++count}.module.js`)
  swap('TEST_FILE', TEST_FILE)
})

// remove from file system
// afterEach(`removing generated files from last test`, function () {
//   // purge before we retest
//   purgeGeneratedFile(TEST_FILE)
// })

/** After all test cases are complete. */
after('Reverting global properties.', async () => {
  /** Restore global variables. */
  await restore()
})
