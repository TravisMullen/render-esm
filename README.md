
# Render ECMAScript Modules (ESM) file

Generate static file(s) with module style `exports`. Will render `exports` from arguments, or other modules, as static variables (`const`). When calling other modules, will include all exports which are found using `import * as ...`, including `default` assigment, but can be filtered to only render selected named `exports`. Can also be used to assign exports with `function` value, or any supported JavaScript type, by passing as arguement into `addExport`.

- [] usage
- [] examples
- [] cli interface
- [] test import function(s)
- [] test bulk export(s)


### Notes

`chmod +x ./test/parseModules.js`
`git update-index --chmod=+x ./test/parseModules.js`

todo: fix (remove) +x 
