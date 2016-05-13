angular.module('ngMainApp')
	.controller('Page3Controller', 
		['$scope', 'apiService', 
		function($scope, apiService) {

			$scope.data = {};

			apiService.getDataStats()
			    .then(function (response) {
			    	$scope.data = response.data;
			    }, function (error) {
			        console.log(error);	
			    });

	}]);