
import path from 'path'
// import glob from 'glob'
import { readdirSync } from 'fs'

// find some matching assets
export const gatherFiles = (fileType, locationOfAssets = __dirname, isRecursive = false) => {
  // let recursiveGlob = ''
  // if (isRecursive) {
  //   recursiveGlob = '**/'
  // }
  console.log('locationOfAssets', path.resolve(locationOfAssets))
  const found = readdirSync(path.resolve(locationOfAssets))

  console.log('found', found)
  if (found.length) {
    return found.filter(i => i.includes(fileType))
  } else {
    return found
  }

  // return glob.sync(path.resolve(locationOfAssets, `${recursiveGlob}*.${fileType}`))
}

// get prefix/root name of file
export const getFileRoot = (filePath, extensionOrSubstring) => (
  filePath.slice(
    filePath.lastIndexOf('/') + 1,
    extensionOrSubstring
      ? filePath.lastIndexOf(`${extensionOrSubstring.replace('.', '')}`)
      : filePath.length
  )
)
