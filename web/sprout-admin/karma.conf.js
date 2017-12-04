// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var isWin = /^win/.test(process.platform);

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    phantomjsLauncher: {
    	// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
    	exitOnResourceError: true
	},
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
		{ pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css', included: true, watched: false}
	],
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    //browsers: ['Chrome'],
    browsers: [],
    singleRun: false
  });
  
  if (!isWin) {
	 config.browsers.push('Chrome'); 
  } else  {
	 config.browsers.push('Firefox'); 
  }
};
