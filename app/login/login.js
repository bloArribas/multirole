(function () {

    'use strict';

    angular.module('myApp.login',
        [
            'ui.router',
            'ct.ui.router.extras.core',
            'permission',
            'permission.ui',
            'ngCookies'
        ])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "login/login.html"
                })
        }])

        .controller('LoginCtrl', ['API_SERVER', '$http', '$scope', '$state', 'PermissionStore', 'loginService', 'RoleStore', '$rootScope', 'appAuth',
            function (API_SERVER, $http, $scope, $state, PermissionStore, loginService, RoleStore, $rootScope, appAuth) {

                $scope.submit = function () {

                    loginService.login($scope.login.username, $scope.login.password)

                        .then(function (data) {

                            appAuth.isLoggedIn = true;
                            appAuth.isAdmin = true;

                            $rootScope.roles = RoleStore.getStore();
                            $rootScope.permissions = PermissionStore.getStore();

                            $scope.$emit('toggleAdminEmit');

                            $state.go('dashboard');

                        }, function (error) {

                            console.log('login error ' + error);

                            $state.go('login');

                        });
                }

            }])

        .factory('loginService', function ($http, $q, API_SERVER, $cookies) {

            var login = function (username, password) {
                var deferred = $q.defer();
                var url = API_SERVER + 'sign_in/';

                $http.post(url, {
                    'username': username,
                    'password': password
                }).then(
                    function (response) {
                        var token = response.data.token;
                        var id = response.data.id;

                        if (token && id) {

                            $cookies.put('token', token);
                            $cookies.put('id', id);

                            deferred.resolve(true);

                        } else {
                            deferred.reject('Invalid data received from server');
                        }
                    },
                    function (response) {
                        deferred.reject(response.data.error);
                    }
                );
                return deferred.promise;
            };

            return {
                login: function (username, password) {
                    return login(username, password);
                }
            };

        })
}());



