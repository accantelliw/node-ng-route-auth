(function () {

    'use strict';

    angular.module('ngMainApp', [
    	'ngRoute',
    	'userData',
    	'authInterceptor',
    	'authService',
    	'apiService'
    ])

    .config(['$httpProvider', 
    	function ($httpProvider) {
    	$httpProvider.interceptors.push('authInterceptor');
    }])

    .constant('AppSettings', {
        AppVersion:     '0.1',             // App version
        AppName:        'node-ng-route-auth', // App name
        LoginPage:      '/login',          // Login page
        MainPage:       '/home',           // Main page: page to redirect user on successful login
        APIBase:        '/api',            // API service base url
        APILogin:       '/api/auth/login', // API authentication service URL
        APIToken:       'x-access-token',  // API token  
        StorageProfile: 'app-profile',     // Cookie/storage name for profile 
        StorageToken:   'app-token'        // Cookie/storage name for token 
    })

    .constant('AppEvents', {
    	AuthSuccess:          'auth-success',      // fired on login success
        AuthFailure:          'auth-failure',      // fired on login failure
        AuthNotAuthenticated: 'not-authenticated', // fired on session timeout/invalid token/...
        AuthNotAuthorized:    'not-authorized'     // fired when trying to access unathorized resource
    })

    .config(['$routeProvider', 
    	function($routeProvider) {
    	
    	$routeProvider
            .when('/login', {
                controller:  'LoginController',
                templateUrl: 'views/login.html'
            })

            .when('/', {
                controller:  'HomeController',
                templateUrl: 'views/home.html'
            })

            .when('/home', {
                controller:  'HomeController',
                templateUrl: 'views/home.html',
                requireAuth: true
            })

            .when('/page1', {
                controller:  'Page1Controller',
                templateUrl: 'views/page.1.html',
                requireAuth: true
            }) 

            .when('/page2', {
                controller:  'Page2Controller',
                templateUrl: 'views/page.2.html',
                requireAuth: true
            }) 

            .when('/page3', {
                controller:  'Page3Controller',
                templateUrl: 'views/page.3.html',
                requireAuth: true,
                authorizedRoles: ['admin']
            })

            .when('/profile', {
                controller:  'PageProfileController',
                templateUrl: 'views/page.profile.html',
                requireAuth: true
            })

            .otherwise({ redirectTo: '/' });
    }])

    .run(function($rootScope) {
    	// load global setting here
    });

}());