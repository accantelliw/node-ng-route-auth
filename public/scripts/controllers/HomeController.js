angular.module('ngMainApp')
	.controller('HomeController', 
		['$scope', 'apiService',
		function($scope, apiService) {

		$scope.data = [];

		apiService.getData()
		    .then(function (response) {
		    	$scope.data = response.data;
		    }, function (error) {
		        console.log(error);	
		    });

	}]);