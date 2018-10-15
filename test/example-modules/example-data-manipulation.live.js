
import camelcase from 'camelcase'

import allData from './example-large-data.js'

function manipulateData () {
  const augmented = []
  for (const { company } of allData) {
    if (company.catchPhrase) {
      augmented.push({
        catchPhrase: camelcase(company.catchPhrase)
      })
    }
  }
  return augmented
}

export default manipulateData
