
import { name } from '../package.json'

describe(`class ${name} failure to contruct`, function () {
  it('should throw Error if first argument not supplied', async function () {
    const badContructor = () => new RenderESM(undefined, { header: TEST_FILE_TYPE })
    expect(badContructor).to.throw(TypeError, 'string')
  })
  it('should throw Error if first argument not a typeof string', async function () {
    for (const badType of NON_STRINGS) {
      const badContructor = () => new RenderESM(badType, { header: TEST_FILE_TYPE })
      expect(badContructor).to.throw(TypeError, 'string', `typeof ${typeof (badType)} should throw TypeError`)
    }
  })
  // it('should throw Error if second argument not supplied', async function () {
  //   const badContructor = () => new RenderESM(TEST_FILE)
  //   expect(badContructor).to.throw(TypeError, 'string')
  // })
  // it('should throw Error if second argument not a typeof string', async function () {
  //   for (const badType of NON_STRINGS) {
  //     const badContructor = () => new RenderESM(TEST_FILE, badType)
  //     expect(badContructor).to.throw(TypeError, 'string', `typeof ${typeof (badType)} should throw TypeError`)
  //   }
  // })
  // it('should not throw Error if third argument not supplied', async function () {
  //   const badContructor = () => new RenderESM(TEST_FILE, { header: TEST_FILE_TYPE })
  //   expect(badContructor).not.to.throw()
  // })
})
