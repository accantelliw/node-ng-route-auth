var userData = angular.module('userData', []);

userData.service('userData', 
    ['$rootScope', '$window', 'AppSettings',
    function ($rootScope, $window, AppSettings) {

    /* 
     * Collect here all functions to store user data,
     * such as authentication token and user profile
     */

    this.saveUserProfile = function (userProfile) {
        if (userProfile)
            $window.sessionStorage[AppSettings.StorageProfile] = JSON.stringify(userProfile);
    }; 

    this.getUserProfile = function () {
    	var x = $window.sessionStorage[AppSettings.StorageProfile];
        if (x) return JSON.parse(x); 
        else return x;
    };

    this.deleteUserProfile = function () {
        delete $window.sessionStorage[AppSettings.StorageProfile];
    }; 

    this.saveToken = function (token) {
        if (token)
            $window.sessionStorage[AppSettings.StorageToken] = token;
    }; 

    this.getToken = function () {
        return $window.sessionStorage[AppSettings.StorageToken];
    };

    this.deleteToken = function () {
        delete $window.sessionStorage[AppSettings.StorageToken];
    };

    this.saveSession = function (userProfile, token) {
        this.saveUserProfile(userProfile);
        this.saveToken(token);
    }; 

    this.deleteSession = function () {
        this.deleteUserProfile();
        this.deleteToken();
    }; 

    this.isValidSession = function () {
        var token       = this.getToken();
        var userProfile = this.getUserProfile();
        if (token && userProfile) {
            
            try 
            {
                var encodedProfile = token.split('.')[1];
                var userProfileDecoded = JSON.parse(base64decode(encodedProfile));
                var a = JSON.stringify(userProfileDecoded);
                var b = JSON.stringify(userProfile);
                // TODO: check token expiration 
                // Math.round(new Date().getTime() / 1000) <= params.exp;
                return a == b;
            }
            catch(e) {}
        }
        return false;
    };

    this.getUserName = function () {
        var userProfile = this.getUserProfile();
        if (userProfile) {
            return userProfile.name;
        }
        return '';
    }; 

    this.getUserRole = function () {
        var userProfile = this.getUserProfile();
        if (userProfile) {
            return userProfile.role;
        }
        return null;
    };    

    this.isUserAllowed = function (requiredRolesArray) {
        requiredRolesArray = requiredRolesArray || [];
        var userRole = this.getUserRole() || '';
        return (requiredRolesArray && userRole && requiredRolesArray.indexOf(userRole)>=0);
    };

}]);
