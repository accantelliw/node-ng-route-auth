var authService = angular.module('authService', []);

authService.service('authService',         
    ['$rootScope', '$http', '$window', 'userData', 'AppSettings', 'AppEvents', 
    function ($rootScope, $http, $window, userData, AppSettings, AppEvents) {

    this.login = function (user, onSuccess, onError) {
        $http.post(AppSettings.APILogin, user)
        	.then(function(response) {

        		if (response && response.data) {
        			
                    var token = response.data.token;
                    var encodedProfile = token.split('.')[1];
    				var userProfile = JSON.parse(base64decode(encodedProfile));
    				
                    userData.saveSession(userProfile, token);
                    $rootScope.$broadcast(AppEvents.AuthSuccess);
        			
                    onSuccess(response.data);
        		}
        		else {
        			userData.deleteSession();
        			$rootScope.$broadcast(AppEvents.AuthFailure);
        			onError('Error getting response');
        		}
                
        	}, function(response) {
                /**
                   Got response object with the following format:
                   {
                     "data": {
                        "success": false,
                        "message": "Invalid Credentials"
                      },
                     "status": 403,
                     ...
                    }
                */
                userData.deleteSession();
                $rootScope.$broadcast(AppEvents.AuthFailure);
                onError(response.data.message || 'Service not available');
            });
    }; 

    this.logout = function () {
        userData.deleteSession();
    };

}]);
