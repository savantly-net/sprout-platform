'use strict';


angular.module('core').controller('CoreController', ['$scope', '$window', 'Authentication', 'Menus', '$mdMenu', '$http', '$location', 
	function($scope, $window, Authentication, Menus, $mdMenu, $http, $location) {
		$scope.goBack = function(){
			$window.history.back();
		};
		
		$scope.clientConfig = clientConfig;
		$scope.$http = $http;
		
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menus = Menus.getMenus();
		$scope.$location = $location;
		
		$scope.doMenuItemCallback = function(subitem, $event){
			if(subitem.callback){
				subitem.callback($event);
			} else {
				console.warn('no callback defined');
			}
		};
		
		$scope.goToLogin = function(){
			$window.location.href = clientConfig.loginUrl;
		};

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
		$scope.noop = function(event){
			event.stopImmediatePropagation();
		};
		
		$scope.closeSubMenu = function(event){
			$mdMenu.hide();
		};
		
		$scope.logout = function(){
			$http({
				  method: 'POST',
				  url: clientConfig.logoutUrl
				}).then(function successCallback(response) {
				    console.log(response);
				    window.location.href = '/';
				    //$window.location.reload(true);
				  }, function errorCallback(response) {
					  console.log(response);
				  });
		};
	
	}
]);