'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'app/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'api/documentation'
        })
            .success(function (data, status, headers, config) {
                $scope.info = data;
                console.log($scope.info);
                $scope.error = null;
            }).
            error(function (data, status, headers, config) {
                if (status == 404 || status || 500) {
                    $scope.error = "ERROROROR";
                    return;
                }
                $scope.error = data;
            });
    }]);