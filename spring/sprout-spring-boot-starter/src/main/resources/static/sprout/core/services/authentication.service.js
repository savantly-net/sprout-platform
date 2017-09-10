'use strict';

// Authentication service for user variables
angular.module('core').factory('Authentication', ['$rootScope', '$location', 
	function($rootScope, $location) {

		var _this = this;
		var security = window.security;
		
		var mapRoles = function(authorityCollection){
			return authorityCollection.map(function(authorityItem){
				return authorityItem.authority;
			});
		};
		
		_this._data = {
				security: security,
				user: security.principal
			};
		
		_this._data.authenticate = function(userDetails){
			
			// If the user is anonymous, create a user structure
			if(userDetails.principal === 'anonymousUser'){
				_this._data.user = {username: userDetails.principal};
				// reformatting the authority array to make it easier to access
				_this._data.user.roles = mapRoles(userDetails.authorities);
			}
			else{
				_this._data.security = userDetails;
				_this._data.user = userDetails.principal;
				_this._data.user.roles = mapRoles(userDetails.principal.authorities);
			}
		};
		
		_this._data.isAuthenticated = function(){
			return (_this._data.security.authenticated === true);
		};
		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
			if (toState.authenticate && !_this._data.isAuthenticated()) {
                $rootScope.returnToState = toState;
                $rootScope.returnToStateParams = toParams;
                $location.path('/signin');
            }
		});
		
		_this._data.authenticate(security);
		return _this._data;
	}
]);