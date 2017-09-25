import resolve from 'rollup-plugin-node-resolve-angular';
import typescript from 'rollup-plugin-typescript2';
import angular from 'rollup-plugin-angular';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pkgGen from 'rollup-plugin-pkg-generator';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';

import { minify } from 'uglify-es';


function cleanName(name){
	var parts = name.split('/');
	if (parts.length > 1) {
		name = parts[parts.length-1];
	}
	return name;
}

const externals = [
	'@savantly/ngx-sprout-module',
	'@angular/core',
	'@angular/common'
]

const targetFolder = './dist/';
const moduleFile = './src/main/resources/index.js';
const browserFile = cleanName(pkg.name) + '.bundle.js';
const minFile = cleanName(pkg.name) + '.bundle.min.js';
const esFile = cleanName(pkg.name) + '.es5.js';

var es5Config = {
		input : './src/main/resources/index.ts',
		output : {
			file : targetFolder + esFile,
			format : 'es',
			exports: 'named'
		},
		externals: externals,
		sourcemap : true,
		name : browserFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			autoExternal(),
			commonjs()
		]
};

var bundleConfig = {
		input : './src/main/resources/index.ts',
		output : {
			file : targetFolder + browserFile,
			format : 'iife',
			exports: 'named'
		},
		externals: externals,
		sourcemap : true,
		name : browserFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			typescript(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			autoExternal(),
			commonjs()
		]
};

var minifyAndCopySrcConfig = {
		input : './src/main/resources/index.ts',
		output : {
			file : targetFolder + minFile,
			format : 'iife',
			exports: 'named'
		},
		sourcemap : true,
		name : minFile.split('.')[0].replace(/-/g, '_'),
		externals: externals,
		plugins : [
			copy({
				'./src/main/resources': './dist/'
			}),
			angular(),
			typescript(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			autoExternal(),
			commonjs(),
			uglify({}, minify),
			pkgGen({pkg:{
				main: './src/main/resources/index.js',
				module: moduleFile,
				browser: browserFile,
				dependencies: pkg.peerDependencies,
				devDependencies: {},
				scripts: {},
				typings: './src/main/resources/index.d.ts'
			}})
		]
};


export default [
	es5Config,
	bundleConfig,
	minifyAndCopySrcConfig
]