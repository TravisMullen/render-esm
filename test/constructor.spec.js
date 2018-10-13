
import { name } from '../package.json'

describe(`class ${name} generating new file`, function () {
  describe('should construct class and automatically call resetModuleSync without any third argument [default]', function () {
    it('should create an ECMAScript 6 module file matching name as first argument', function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(createESM).to.be.an.instanceof(CreateESM)
      expect(stats).to.be.a('object', 'file was expected to be created.')
    })
    it('should a header that matches the second argument', function () {
      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE)

      let file
      try {
        file = readFileSync(TEST_FILE)
      } catch (err) {
        file = err
      }

      expect(createESM).to.be.an.instanceof(CreateESM)
      expect(file.toString()).to.include(TEST_FILE_TYPE, `file should contain header with ${TEST_FILE_TYPE} (second argument in constructor)`)
    })
  })
  describe('should construct class and not call resetModuleSync with falsy third argument', function () {
    it('should create an ECMAScript 6 module file', function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(createESM).to.be.an.instanceof(CreateESM)
      expect(stats).to.be.a('object', 'file was expected to be created.')
    })
    it('should create an ECMAScript 6 module file when resetModuleSync manually called', function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, true)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('object', 'file was expected to be created.')

      createESM.resetModuleSync()

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('object', 'file was expected to be created.')
    })
  })
  describe('should construct class and not call resetModuleSync with falsy third argument', function () {
    it('should not create an ECMAScript 6 module file', function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, false)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(createESM).to.be.an.instanceof(CreateESM)
      expect(stats).to.be.a('error', 'file should not have been created!')
    })
    it('should create an ECMAScript 6 module file when resetModuleSync manually called', function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, false)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'file should not have been created, yet!')

      createESM.resetModuleSync()

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('object', 'file was expected to be created.')
    })
    it('should create an ECMAScript 6 module file when [async] resetModule manually called', async function () {
      let stats
      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'control test. file already exists!')

      const createESM = new CreateESM(TEST_FILE, TEST_FILE_TYPE, false)

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('error', 'file should not have been created, yet!')

      await createESM.resetModule()

      try {
        stats = statSync(TEST_FILE)
      } catch (err) {
        stats = err
      }

      expect(stats).to.be.a('object', 'file was expected to be created.')
    })
  })
})