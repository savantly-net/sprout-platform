// Configuring the module

// Config HTTP Error Handling
angular.module('core').config(['$httpProvider', 
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$window', 'Authentication',
			function($q, $window, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$window.location.href = '/login';
								break;
							case 403:
								// Redirect to signin page
								$window.location.href = '/login';
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);

angular.module('core').run(['Menus', function(Menus){
	
}]);