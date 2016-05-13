angular.module('ngMainApp')
	.controller('LoginController', 
	['$scope', '$location', 'authService', 'AppSettings',
	function($scope, $location, authService, AppSettings) {

		$scope.user = {};
		$scope.errorMessage = '';

		$scope.login = function () {

			authService.login(
				$scope.user, 
				function(user) {
					$location.path(AppSettings.MainPage);
				},
				function(msg) {
					$scope.errorMessage = msg;
				});
		};

	}]);
