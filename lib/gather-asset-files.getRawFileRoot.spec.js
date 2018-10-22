import 'babel-register'
import 'babel-polyfill'
import { expect } from 'chai'

import {
  // createNodeProjectGlob,
  getRawFileRoot
} from '../lib/gather-asset-files.js'

const testPaths = [
  './some/dir/alpha.beta.js',
  './some/dir/alpha-beta.js',
  './some/alpha.beta.js',
  './some/alpha-beta.js',
  'some/dir/alpha.beta.js',
  'some/dir/alpha-beta.js',
  'some/alpha.beta.js',
  'some/alpha-beta.js',
  'alpha.beta.js',
  'alpha-beta.js',
  './alpha.beta.js',
  './alpha-beta.js',
  '../alpha.beta.js',
  '../alpha-beta.js',
  './some/dir/alpha.beta.namespace.js',
  './some/dir/alpha-beta-namespace.js',
  './some/alpha.beta.namespace.js',
  './some/alpha-beta-namespace.js',
  'some/dir/alpha.beta.namespace.js',
  'some/dir/alpha-beta-namespace.js',
  'some/alpha.beta.namespace.js',
  'some/alpha-beta-namespace.js',
  'alpha.beta.namespace.js',
  'alpha-beta-namespace.js',
  './alpha.beta.namespace.js',
  './alpha-beta-namespace.js',
  '../alpha.beta.namespace.js',
  '../alpha-beta-namespace.js',
  './some/dir/alpha-beta.html',
  './some/alpha.beta.html',
  './some/alpha-beta.html',
  'some/dir/alpha.beta.html',
  'some/dir/alpha-beta.html',
  'some/alpha.beta.html',
  'some/alpha-beta.html',
  'alpha.beta.html',
  'alpha-beta.html',
  './alpha.beta.html',
  './alpha-beta.html',
  '../alpha.beta.html',
  '../alpha-beta.html',
  './some/dir/alpha.beta.namespace.html',
  './some/dir/alpha-beta-namespace.html',
  './some/alpha.beta.namespace.html',
  './some/alpha-beta-namespace.html',
  'some/dir/alpha.beta.namespace.html',
  'some/dir/alpha-beta-namespace.html',
  'some/alpha.beta.namespace.html',
  'some/alpha-beta-namespace.html',
  'alpha.beta.namespace.html',
  'alpha-beta-namespace.html',
  './alpha.beta.namespace.html',
  './alpha-beta-namespace.html',
  '../alpha.beta.namespace.html',
  '../alpha-beta-namespace.html'
]

const MATCH = 'alphabeta'
const testName = (fileName, raw) => {
  const filtered = fileName
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/-/g, '')
  expect(filtered).to.not.have.string(/\//) // '/'
  expect(filtered).to.equal(MATCH, `should get name from ${raw}`)
}

describe('get root name from filepath with "getRawFileRoot".', function () {
  it('should remove extension by default', function () {
    for (const jawn of testPaths) {
      testName(
        getRawFileRoot(jawn)
          .replace('namespace', ''),
        jawn
      )
    }
  })
  it('should remove namespace as second argument', function () {
    for (const jawn of testPaths) {
      testName(
        getRawFileRoot(jawn, 'namespace'),
        jawn
      )
    }
  })
})

// describe('get root name from filepath with "getRawFileRoot".', function () {
//   it('should remove extension by default', function () {
//     createNodeProjectGlob
//   })
//   it('should remove namespace as second argument', function () {
//     for (const jawn of testPaths) {
//       testName(
//         getRawFileRoot(jawn, 'namespace'),
//         jawn
//       )
//     }
//   })
// })
