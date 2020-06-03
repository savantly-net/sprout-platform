import babel from '@rollup/plugin-babel' 

const config = {
    input: 'src/main/browser/index.js',
    external: ['react'],
    output: {
        format: 'umd',
        name: 'contentModule',
        globals: {
            react: "React"
        }
    },
	plugins: [
	    babel({
	        exclude: "node_modules/**"
	    })
	]
}
export default config