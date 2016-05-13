var apiService = angular.module('apiService', []);

apiService.service('apiService', 
    ['$http', 'AppSettings', 
    function ($http, AppSettings) {

    this.getData = function () {
        return $http.get(AppSettings.APIBase + '/data');
    };

    this.getDataById  = function(id) {
        return $http.get(AppSettings.APIBase + '/data/get/' + id);
    }; 

    this.getDataStats  = function(id) {
        return $http.get(AppSettings.APIBase + '/data/stats');
    }; 

    this.getUserProfile = function () {
        return $http.get(AppSettings.APIBase + '/auth/profile');
    };

}]);
