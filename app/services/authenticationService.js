(function () {
    'use strict';

    angular
        .module('myApp.services', [])
        .factory('AuthenticationService', AuthenticationService);

    function AuthenticationService() {

        var service = {
            registerUser: registerUser,
            loginUser: loginUser
        };

        return service;

        //Unused
        function registerUser($http, API_SERVER, $window) {

            var register = function (username, password) {
                var deferred = $q.defer();
                var url = API_SERVER + 'register/';

                $http.post(url, 'username=' + username + '&password=' + password, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(
                    function (response) {
                        var token = response.data.token;
                        var username = response.data.username;

                        if (token && username) {
                            $window.localStorage.token = token;
                            $window.localStorage.username = username;
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
                register: function (username, password) {
                    return register(username, password);
                }
            };
        };

        //Unused
        function loginUser($http, $q, API_SERVER, $cookies){

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
                loginUser: function (username, password) {
                    return login(username, password);
                }
            };

        }

    }

}());