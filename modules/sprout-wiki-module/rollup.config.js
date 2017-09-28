import resolve from 'rollup-plugin-node-resolve-angular';
import angular from 'rollup-plugin-angular';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pkgGen from 'rollup-plugin-pkg-generator';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';
var fs = require('fs');

import { minify } from 'uglify-es';


const globals = {
  "@angular/core" : "ng.core",
  "@angular/common" : "ng.common",
  "@angular/router" : "ng.router"
};

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

var glob = require("glob");
var files = glob.sync("(src/**/*!(*.ts)");

files.map(function(file){
	console.log('found file: ' + file);
	copyFile(file, './dist/' + file.substr(4), function(err){
	  if(err) {
        console.error(err);
        process.exit(1);
	  };
	});
});

function cleanName(name){
	var parts = name.split('/');
	if (parts.length > 1) {
		name = parts[parts.length-1];
	}
	return name;
}

const entryFile = './build/index.js';
const esFile = 'module.js';
const bundleFile = cleanName(pkg.name) + '.umd.js';
const minFile = cleanName(pkg.name) + '.umd.min.js';
const targetFolder = './dist/';

var umdConfig = {
		input : entryFile,
		output : {
			file : targetFolder + bundleFile,
			format : 'umd',
			exports: 'named'
		},
		sourcemap : true,
		name : bundleFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			commonjs(),
			autoExternal()
		],
		external: Object.keys(globals),
		globals: globals
};

var minifyConfig = {
		input : entryFile,
		output : {
			file : targetFolder + minFile,
			format : 'umd',
			exports: 'named'
		},
		sourcemap : true,
		name : minFile.split('.')[0].replace(/-/g, '_'),
		plugins : [
			angular(),
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			commonjs(),
			autoExternal(),
			uglify({}, minify),
			pkgGen({pkg:{
				main: bundleFile,
				module: esFile,
				"jsnext:main": esFile,
				dependencies: pkg.peerDependencies,
				devDependencies: {},
				scripts: {},
				typings: 'index.d.ts'
			}})
		],
		external: Object.keys(globals),
		globals: globals
};


export default [
	umdConfig,
	minifyConfig
]