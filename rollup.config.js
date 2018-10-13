import pkg from './package.json';

const external = [
	...Object.keys(pkg.dependencies),
	'fs',
	'child_process',
	'path'
]

export default {
		input: 'src/main.js',
		external,
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
