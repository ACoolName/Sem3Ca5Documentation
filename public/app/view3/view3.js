'use strict';


angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http) {
        var getDocumentation = function () {
            $http.get('/api/documentation')
                .success(function (data, status, headers, config) {
                    $scope.doc = data;
                    $scope.error = null;
                })
                .error(function (data, status) {
                    if (status == 500) {
                        $scope.error = "ERROROROR";
                        return;
                    }
                    $scope.error = data;
                });
        };
        $http.post('/adminApi/documentation').
            success(function (data, status, headers, config) {
                getDocumentation();
            });

        $scope.editDocumentation = function () {
            $http.put('/adminApi/documentation', JSON.stringify($scope.doc))
                .success(function (data, status, headers, config) {
                    $scope.do = data;
                    $scope.success = "Documentation updated";
                })
                .error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    });



