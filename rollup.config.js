import pkg from './package.json';

const external = [
	...Object.keys(pkg.dependencies),
	// 'path',
	'fs',
	'child_process'
]

export default {
		input: 'src/main.js',
		external,
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
