/**
 * base64 encode files to generated es6 module file.
 * The directory in which this script is run will be searched.
 * Each found file will be base64 encoded using system binary `which base64`
 * and added as a named export within the generate JavaScript module file.
 *
 */

// import path from 'path'
import parseArgs from './parse-args.js'
import CreateESM from './build-esm-file.js'
import { whichBase64, base64encode } from './base64-encode.js'
import { gatherFiles, getFileRoot } from './gather-asset-files.js'

if (!process) {
  console.log('no node process.')
}

whichBase64(process)

const FLAGS = Object.freeze({
  /** target file type or substring */
  TARGET: '--target',
  /** path to find target files */
  PATH: '--path',
  /** name and path for rendered ESM file */
  OUTPUT: '--output',
  /** should file search be recursive */
  RECURSIVE: '--recursive'
})

const args = parseArgs(process)
const CWD = process.cwd()

let targetString
// set file type from argument
if (!args[FLAGS.TARGET]) {
  console.log(`
Please set use flag --target with a value of a file extension or substring of file name.
  
  @example for 'somefile.module.js'
  @use --target=js or --target=module
    `)
  process.exit(1)
} else {
  targetString = args[FLAGS.TARGET]
    .toLowerCase()
}

// set root asset directory file from argument
let locationOfAssets = args[FLAGS.PATH] || CWD

// set export destination file from argument
let exportedModuleName = args[FLAGS.OUTPUT] || `${CWD}/${targetString.replace('.', '')}.module.js`

console.log(`
  Gathering ${targetString} assets from ${locationOfAssets}

`)

let isRecursive = false
if (!args[FLAGS.location] !== undefined) {
  isRecursive = true
}

// const base64toESM = () => {
const foundAssets = gatherFiles(targetString, locationOfAssets, isRecursive)
let esmFile

if (foundAssets.length) {
  esmFile = new CreateESM(exportedModuleName, targetString)
  esmFile.resetModule()
} else {
  console.log(`No ${targetString} assets found.`)
  process.exit()
}

for (const filePath of foundAssets) {
  const key = getFileRoot(filePath, targetString)

  const output = base64encode(filePath)
  if (output) {
    esmFile.addExport(key, output)
  }
}

console.log(`
    assets have been encoded and added as exports to file ${exportedModuleName}.

  `)

process.exit()
// }
