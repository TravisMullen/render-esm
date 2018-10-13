
import { name } from '../package.json'

const nonStrings = [
  function () {
    return 'something'
  },
  51232,
  null,
  [1, 2, '3'],
  { key: 'value' }
]

describe(`class ${name} failure to contruct`, function () {
  it('should throw Error if first argument not supplied', async function () {
    const badContructor = () => new CreateESM(undefined, TEST_FILE_TYPE)
    expect(badContructor).to.throw(TypeError, /String/)
  })
  it('should throw Error if first argument not a typeof string', async function () {
    for (const badType of nonStrings) {
      const badContructor = () => new CreateESM(badType, TEST_FILE_TYPE)
      expect(badContructor).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
    }
  })
  it('should throw Error if second argument not supplied', async function () {
    const badContructor = () => new CreateESM(TEST_FILE)
    expect(badContructor).to.throw(TypeError, /String/)
  })
  it('should throw Error if second argument not a typeof string', async function () {
    for (const badType of nonStrings) {
      const badContructor = () => new CreateESM(TEST_FILE, badType)
      expect(badContructor).to.throw(TypeError, /String/, `typeof ${typeof (badType)} should throw TypeError`)
    }
  })
  it('should not throw Error if third argument not supplied', async function () {
    const badContructor = () => new CreateESM(TEST_FILE, TEST_FILE_TYPE)
    expect(badContructor).not.to.throw()
  })
})
