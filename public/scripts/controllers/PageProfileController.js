angular.module('ngMainApp')
	.controller('PageProfileController', 
		['$scope', 'apiService', 
		function($scope, apiService) {

		$scope.id 	= '';
    	$scope.name = '';
    	$scope.role = '';

		apiService.getUserProfile()
		    .then(function (response) {
		    	var profile = response.data;
		    	$scope.id 	= profile.id;
		    	$scope.name = profile.name;
		    	$scope.role = profile.role;
		    }, function (error) {
		        console.log(error);	
		    });

	}]);