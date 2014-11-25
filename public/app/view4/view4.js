'use strict';


angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'view4Ctrl'
        });
    }])

    .controller('view4Ctrl', function ($scope, $http) {
        var getDocumentation = function () {
            $http.get('/api/documentation')
                .success(function (data, status, headers, config) {
                    $scope.doc = data;
                    console.log($scope.doc);
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
        console.log("dasdas");
        $http.post('/adminApi/documentation').
            success(function (data, status, headers, config) {
                console.log("hi");
                getDocumentation();
            });

        $scope.editDocumentation = function () {
            console.log($scope.doc);
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



