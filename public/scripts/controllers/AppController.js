angular.module('ngMainApp')
	.controller('AppController', 
	['$rootScope', '$scope', '$window', '$location', 'authService', 'userData', 'AppSettings', 'AppEvents', 
	function($rootScope, $scope, $window, $location, authService, userData, AppSettings, AppEvents) {

		/* 
		 * This is a global/parent controller, to handle 
		 * global application states, data and broadcast
		 * callbacks.
		 */

		$scope.appName    = AppSettings.AppName;	
		$scope.appVersion = AppSettings.AppVersion;	
		$scope.username   = userData.getUserName();	// will reload data on refresh...

		/*
		 * Callback functions to handle application
		 * authentication/authorization events
		 */

		var logEvent = function(name, event, data) {
			console.log('[AppController] Event:'+name);
		};

		var onEventAuthSuccess = function(event, data) {
			logEvent('onEventAuthSuccess', event, data);
			$scope.username = userData.getUserName();
		};		

		var onEventAuthFailure = function(event, data) {
			logEvent('onEventAuthFailure', event, data);
			userData.deleteSession();
			$location.path(AppSettings.LoginPage);
		};		
		
		var onEventAuthNotAuthenticated = function(event, data) {
			logEvent('onEventAuthNotAuthenticated', event, data);
			userData.deleteSession();
			$location.path(AppSettings.LoginPage);
		};	
		
		var onEventAuthNotAuthorized = function(event, data) {
			logEvent('onEventAuthNotAuthorized', event, data);
			userData.deleteSession();
			$location.path(AppSettings.LoginPage);
		};				

		$rootScope.$on(AppEvents.AuthSuccess,    	   onEventAuthSuccess);	
		$rootScope.$on(AppEvents.AuthFailure,    	   onEventAuthFailure);	
		$rootScope.$on(AppEvents.AuthNotAuthenticated, onEventAuthNotAuthenticated);	
		$rootScope.$on(AppEvents.AuthNotAuthorized,    onEventAuthNotAuthorized);	

		$rootScope.$on('$routeChangeStart', function (event, next) {
		    var authorizedRoles = next.authorizedRoles;
		    if (next.requireAuth === true) {
		    	if (userData.isValidSession()) {
		    		// authenticated, check if user has right permissions
		    		if (authorizedRoles && 
		    				!userData.isUserAllowed(authorizedRoles)) {
			    		event.preventDefault(); // not authorized
			    		$rootScope.$broadcast(AppEvents.onEventAuthNotAuthorized);
			    	}
		    	} 
		    	else {
		    		event.preventDefault();	// not authenticated
		    		$rootScope.$broadcast(AppEvents.AuthNotAuthenticated);
		    	}
		    }
		});

		/*
		 * Global controller functions
		 *
		 */

		$scope.isAuthenticated = function(path) {
			return userData.isValidSession();
		};

		$scope.getUserProfile = function(path) {
			return userData.getUserProfile();
		};		

		$scope.isAdmin = function(){
			return userData.getUserRole() == 'admin';
		};

		$scope.getToken = function(path) {
			return userData.getToken();
		};

		$scope.isActive = function(path) {

			var isMainPage   = new RegExp(AppSettings.MainPage).test(path);
			var locationPath = $location.path().substr(0, path.length);

			if (isMainPage && locationPath === '/') {
				return 'active';
			}
			else {
				return (locationPath === path) ? 'active' : '';
			}	
		};
		
		$scope.logout = function(){
			authService.logout();
			$location.path(AppSettings.LoginPage);
		};

	}]);