var APP_URL = '{{ protocol }}://{{ host }}:{{ port }}';
var API_URL = '{{ protocol }}://{{ host }}:{{ port }}';

// Parse query string
var query = {};
location.search.substr(1).split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

var appUrl = query.appUrl || 'http://localhost:3001';
var apiUrl = query.apiUrl || 'http://localhost:3001';

angular.module('formioApp').constant('AppConfig', {
  appUrl: appUrl,
  apiUrl: apiUrl,
  forms: {
    userForm: appUrl + '/{{ userForm }}',
    userLoginForm: appUrl + '/{{ userLoginForm }}'
  }
});
