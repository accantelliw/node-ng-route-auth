var authInterceptor = angular.module('authInterceptor', []);

authInterceptor.factory('authInterceptor', 
      ['$rootScope', '$q', 'userData', 'AppSettings', 'AppEvents',
      function ($rootScope, $q, userData, AppSettings, AppEvents) {

      /* 
       * This code run on every app http requests,
       * including partials and views.
       */
      
      var debug = false; 

      return {
        
        request: function (config) {
          if (debug) console.log("[authInterceptor|request]"+
            " intercept request: " + JSON.stringify(config));

          var url = config.url;
          var isApiCall   = new RegExp(AppSettings.APIBase).test(url);
          var isLoginCall = new RegExp(AppSettings.APILogin).test(url);

          if (url && isApiCall && !isLoginCall) {
            config.headers = config.headers || {};
            if (userData.getToken()) {
              /* 
               * Append token to API header requests.
               * If token has been rebuild, this will 
               * automatically add the new one.
               */
              config.headers[AppSettings.APIToken] = userData.getToken();
            }
            else {
              $rootScope.$broadcast(AppEvents.AuthNotAuthenticated);
            }
          }

          return config;
        },
        
        response: function (response) {
          if (debug) console.log("[authInterceptor|response]"+
            " intercept response: " + JSON.stringify(response));
          return response || $q.when(response);
        },

        requestError: function(config) {
  	      return $q.reject(config);
  	    },

  	    responseError: function(response) {
  	      if (debug) console.log("[authInterceptor|responseError]"+
            " intercept responseError: " + JSON.stringify(response));

          var url = response.config.url;
          var isApiCall = new RegExp(AppSettings.APIBase).test(url);
          var isLoginCall = new RegExp(AppSettings.APILogin).test(url);

          if (url && isApiCall && !isLoginCall) {
            if (response.status === 401)      
              $rootScope.$broadcast(AppEvents.AuthNotAuthenticated);
            else if (response.status === 403) 
              $rootScope.$broadcast(AppEvents.AuthNotAuthorized);
          }

  	      return $q.reject(response);
  	    }

      };

}]);
