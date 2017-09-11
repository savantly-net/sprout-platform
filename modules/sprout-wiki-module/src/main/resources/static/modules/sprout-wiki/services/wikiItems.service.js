//service used to communicate with REST endpoints
angular.module('requests').factory('Requests', ['$resource', '$http', 
	function($resource, $http) {
		return $resource('/api/sprout-wiki/:id', { id: '@id' }, {
			query: {
				isArray: false
			}
		});
	}
]);