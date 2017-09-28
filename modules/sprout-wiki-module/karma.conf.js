var resolve = require('rollup-plugin-node-resolve-angular');
var commonjs = require('rollup-plugin-commonjs');
var angular = require('rollup-plugin-angular');
var typescript = require('rollup-plugin-typescript2');

var path = require('path');

var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isWin = /^win/.test(process.platform);
var testFilePattern = './src/**/*.spec.ts';
var karmaShim = './karma-shim.js';


module.exports = function (config) {
  var _config = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    
    // list of files / patterns to load in the browser
    files: [
    	{ pattern: karmaShim, watched: false},
        { pattern: testFilePattern, watched: false }
    ],

    // list of files to exclude
    exclude: [],
    
    mime: {
        'text/x-typescript': ['ts','tsx']
	},

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    	[karmaShim]: ['rollup', 'sourcemap' ],
    	[testFilePattern]: [ 'rollupTs', 'sourcemap' ]
    },
    
    rollupPreprocessor: {
		format: 'umd',
		name: 'ngxLibrary',
		sourcemap: 'inline',
		external: ['fs'],
		globals: ['fs', 'require'],
    	plugins: [
			resolve({
				browser: true
			}),
			commonjs()
		]
	},
	
	customPreprocessors: {
		// Clones the base preprocessor, but overwrites
		// its options with those defined below...
		rollupTs: {
			base: 'rollup',
			options: {
				// In this case, to use a different transpiler:
				plugins: [
					angular(),
		    		typescript({tsconfig: 'tsconfig.test.json'}),
					resolve({
						browser: true,
						main: true,
						module: true
					}),
					commonjs()
				]
			}
		}
	},

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["spec"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  };
  
  if (!isWin) {
	 _config.browsers.push('Chrome'); 
  } else {
	  _config.browsers.push('Firefox');
  }

  if (!isTestWatch) {
    _config.reporters.push("coverage");

    _config.coverageReporter = {
      dir: 'coverage/',
      reporters: [{
        type: 'json',
        dir: 'coverage',
        subdir: 'json',
        file: 'coverage-final.json'
      }]
    };
  }

  config.set(_config);

};
