
import { resolve } from 'path'

const someDefaultModule = resolve(__dirname, './helpers/example-module-prerender.js')

function badContructorFirstArgument (argumentValue) {
  const testInstance = new RenderESM(TEST_FILE, TEST_FILE_TYPE)
  const arg = argumentValue
  return function () {
    testInstance.addRenderedExport(arg)
  }
}

const badContructorSecondArgument = argumentValue => {
  const testInstance = new RenderESM(TEST_FILE, TEST_FILE_TYPE)
  const arg = argumentValue
  return function () {
    testInstance.addRenderedExport(someDefaultModule, arg)
  }
}

describe.skip(`failure to "addRenderedExport"`, function () {
  it('should throw Error if first argument not supplied', async function () {
    const badFn = badContructorFirstArgument(undefined)
    expect(badFn).to.throw(TypeError)
  })
  it('should throw Error if first argument not a typeof string', async function () {
    for (const badType of NON_STRINGS) {
      const badFn = badContructorFirstArgument(badType)
      expect(badFn).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
    }
  })

  it.skip('should throw Error if second argument not an Array', async function () {
    const testString = 'some string jawn.'
    expect(badContructorSecondArgument(testString)).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
    for (const badType of NON_STRINGS) {
      // there is an Array in the test data
      // and its mixed type and will fail
      // but that is the next test, so lets seperate concerns
      if (!Array.isArray(badType)) {
        expect(badContructorSecondArgument(badType)).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
      }
    }
  })

  it.skip('should throw Error if second arguments Array contains non-Strings', async function () {
    for (const badType of NON_STRINGS) {
      const testArray = [badType]
      expect(badContructorSecondArgument(testArray)).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
    }
  })

  it.skip('should not throw Error if second argument not supplied', async function () {
    expect(badContructorSecondArgument(undefined)).not.to.throw()
  })
})
