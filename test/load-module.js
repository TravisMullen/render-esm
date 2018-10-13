#!/usr/bin/env node

export const loadModule = async fileName => {
  let res
  try {
    res = await import(fileName)
  } catch (err) {
    console.error(err)
  }
  return res
}

export const logModuleContent = async fileName => {
  const value = await loadModule(fileName)
  if (!value) {
    console.error('module not found')
    process.exit(1)
  }
  for (const item in value) {
    console.count('key:value')
    console.log('name', item)
    console.log('value', value[item])
  }
  // exit once parsed
  process.exit()
}
