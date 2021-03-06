angular.module('myAppRename.controllers', []).
    controller('AppCtrl', function ($scope, $http, $window, $location) {

        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }

        if(loggedIn()) {
            $scope.username = $window.sessionStorage.username;
            $scope.isAdmin = $window.sessionStorage.role == "admin";
            $scope.isUser = !$scope.isAdmin;
            $scope.isAuthenticated = true;
        } else {
            $scope.username = "";
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
        }

        $scope.title = "Semester Project";

        $scope.message = '';
        $scope.error = null;

        $scope.submit = function () {
            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    $window.sessionStorage.username = profile.username;
                    $window.sessionStorage.role = profile.role;
                    $scope.username = profile.username;
                    $scope.isAdmin = profile.role == "admin";
                    $scope.isUser = !$scope.isAdmin;
                    $scope.error = null;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    deleteSession();
                    $scope.isAuthenticated = false;
                    $scope.error = 'You failed to login. Invalid User or Password';
                });
        };
        function loggedIn() {
            if($window.sessionStorage.token == undefined || $window.sessionStorage.token == null) {
                return false;
            }
            return true;
        }
        $scope.isLoggedin = loggedIn;

        function deleteSession() {
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.username;
            delete $window.sessionStorage.role;
        }
        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            deleteSession();
            $location.path("/view1");
        }
    })

    .controller('MyCtrl2', function ($scope) {
        // write MyCtrl2 here
    });



