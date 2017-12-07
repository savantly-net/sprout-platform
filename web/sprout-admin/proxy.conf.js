const PROXY_CONFIG = [ {
	context : [
		'/api/**', '/rest/**'
	],
	target : "http://localhost:8080",
	secure : false,
	bypass : function(req, res, proxyOptions) {
		// not skipping any requests at this time
	}
} ];

module.exports = PROXY_CONFIG;