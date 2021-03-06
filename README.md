
# Render ECMAScript Modules (ESM) file

Generate static file(s) with module style `exports`. Will render `exports` from arguments, or other modules, as static variables (`const`). When calling other modules, will include all exports which are found using `import * as ...`, including `default` assigment, but can be filtered to only render selected named `exports`. Can also be used to assign exports with `function` value, or any supported JavaScript type, by passing as arguement into `addExport`.

Supports Async and Sync methods.

## Usage

See tests:

- [Create Instance](test/1.constructor.spec.js)
- [Reset/Clear Module File](test/shared/resetModule.shared.js)
- [Add Named and/or `default` Export - from argument](test/shared/addExport.shared.js)
- [Add Rendered Named and/or `default` Export - from another ESM file](test/7.addRenderedExport.spec.js)

Can format file (add Semi-colons) using `formateFile` from instance.
```js

const renderESM = new RenderESM('./my-new-module.js', { header: 'Header Content' }) 
// will reset existing file by default (calling `resetModuleSync`)
// to maintain existing file content use `false` as third argument
// => will create './my-new-module.js' with `/** Header Content exports as es6 module */` as first line.

renderESM.addExport('myNamedExport', 'a string value.')
// => export const myNamedExport = 'a string value.'

renderESM.formateFile() // as semistandard / is standard by default
// => export const myNamedExport = 'a string value.';


```

## CLI

sill work in progress...




### More detailed usage coming...



- [] usage
- [] examples
- [] cli interface
- [] test import function(s)
- [] test bulk export(s)


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

