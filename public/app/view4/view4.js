'use strict';


angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'view4Ctrl'
        });
    }])

    .controller('view4Ctrl', function ($scope, $http) {
        $http.get('/api/stuff')
            .success(function (data, status, headers, config) {
                $scope.data = data;
                console.log(data);
                $scope.error = null;
            })
            .error(function (data, status) {
                if (status == 500) {
                    $scope.error = "ERROROROR";
                    return;
                }
                $scope.error = data;
            });
    });



