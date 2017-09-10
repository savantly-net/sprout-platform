'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'sprout';
	var applicationModuleVendorDependencies = ['ngAria', 
	                                           'ngResource', 
	                                           'ngCookies',  
	                                           'ngAnimate',  
	                                           'ngSanitize',
	                                           'ui.router',
	                                           'ngMaterial'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		console.log('Loading Module: ' + moduleName);
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();