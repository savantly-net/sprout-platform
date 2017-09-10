'use strict';

angular.module('core').factory('userDeviceDetector', [
	function() {

		this.device = 'unknown';
		this.iphone = false;
		this.android = false;
		
		function isIPhone(){
			return (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i));
		}
		
		function isAndroid(){
			return (navigator.userAgent.match(/Android/i));
		}
		
		if(isIPhone()) {this.device = 'iphone'; this.iphone = true;}
		else if(isAndroid()) {this.device = 'android'; this.android = true;}
		
		return this;
	}
]);