'use strict';


angular.module('myAppRename.view5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'app/view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $http) {
        $scope.addStuff = function () {
            $http.post('/adminApi/stuff', JSON.stringify($scope.stuff))
                .success(function (data, status, headers, config) {
                    $scope.do = data;
                    $scope.success = "Stuff added at " + new Date();
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    });



