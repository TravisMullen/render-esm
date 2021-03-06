
import { parse, resolve } from 'path'
import { sync as globSync } from 'glob'

/**
 * Creates Regular Expression for finding files by extension,
 * ignoring `node_modules` directory.
 *
 * @see {@link} https://github.com/prettier/prettier/issues/1358
 *
 * @param {string} fileExtension
 * @param {boolean} substring should `fileExtension` be searched as a extension or substring of filename.
 * @return {regex} for use in glob file searches @see {@link} http://tldp.org/LDP/abs/html/globbingref.html
 *
 */
export const createNodeProjectGlob = (fileExtension = 'js', substring = false) => (
  [
    `{,!(node_modules)/**/}*`, // exclude `node_modules` directory
    substring ? '' : '.', // add period prefix for `.ext`
    fileExtension
      .toLowerCase() // lower the case...
      .replace(/^\./, ''), // remove ext period prefix if passed in by user.
    substring ? '*' : '' // add `*` for substring search
  ].join('') // combine as one string without breaks or spaces
)

/**
 * Finds all files by extension or substring.
 * Assumes CWD is root of project (run from `package.json`)
 *
 * @param {string} fileExtension File extension
 * @param {boolean} substring Custom glob, if default is not desired.
 * @return {string[]} list of file paths
 */
export const gatherFiles = (fileExtension, substring = false) => (
  globSync(resolve(process.cwd(), createNodeProjectGlob(fileExtension, substring)))
)

/**
 * Finds all files by custom glob.
 * Assumes CWD is root of project (run from `package.json`)
 *
 * @param {string} fileExtension File extension
 * @return {string[]} list of file paths
 */
export const gatherFilesFromGlob = customGlob => (
  globSync(resolve(process.cwd(), customGlob))
)

/**
 * Gets root name file path.
 *
 * param {string} filePath File extension
 * @param {string} substring Removes everything after start of substring.
 * @return {string} Name of file without extension, or anything after subtring.
 */
export const getRawFileRoot = (filePath, substring) => {
  const { name } = parse(filePath)
  if (substring &&
    typeof (substring) === 'string' &&
    name.includes(substring)) {
    return name.slice(
      0,
      name.indexOf(substring)
    )
  } else {
    return name
  }
}

/**
 * Gets name of file, with extension, from path.
 *
 * param {string} filePath Full path of file.
 * @return {string} Name of file with extension.
 */
export const getFileName = (filePath) => (
  filePath.slice(
    filePath.lastIndexOf('/') + 1,
    filePath.length
  )
)
