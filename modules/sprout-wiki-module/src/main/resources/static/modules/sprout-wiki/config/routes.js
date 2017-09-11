'use strict';

// Setting up route
angular.module('sproutWiki').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.
		state('wiki', {
			url: '/wiki',
			templateUrl: 'modules/sprout-wiki/views/index.view.html'
		});
	}
]);