angular.module('toResults', []);

angular.
	module('toResults').
	component('toResults', {
		templateUrl: 'index/to-results/to-results-template.html',
		controller: ['$rootScope',
			function toResultsController($rootScope) {
				this.taskTitle = classRegex.currentTask.titleRussian;
				this.results = classRegex.results;
				$rootScope.title = 'Результаты';
				$rootScope.isAutorizated = this.isAutorizated = classRegex.isAutorizated;
                if (!classRegex.isAutorizated) {
                    $rootScope.isAutorizated = false;
                } else {
                    $rootScope.isAutorizated = true;
                    $rootScope.userName = classRegex.user.login;
                }
			}
		]
	});