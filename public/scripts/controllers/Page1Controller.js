angular.module('ngMainApp')
	.controller('Page1Controller', 
		['$scope', 'apiService',
		function($scope, apiService) {

		$scope.quote = '';
		$scope.author = '';
		$scope.randomId = 0;

		$scope.getRandomData = function () {

			$scope.randomId = Math.round(Math.random()*10);

			apiService.getDataById($scope.randomId)
			    .then(function (response) {
			    	$scope.quote  = response.data.quote;
			    	$scope.author = response.data.author;	
			    }, function (error) {
			        console.log(error);	
			    });
		}; 
		
		var init = function () {
		   $scope.getRandomData();
		};
		
		init();

	}]);