(function () {

    'use strict';

    angular.module('myApp', [
        'ui.router',
        'myApp.view1',
        'myApp.view2',
        'myApp.version',
        'ngCookies'
    ])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {

            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go('view1');
            });

        }])

        .config(['$urlRouterProvider', '$httpProvider', '$stateProvider', function ($urlRouterProvider, $httpProvider, $stateProvider) {

            $provide.factory('AuthTokenManager', function ($q, $cookies, $location) {
                return {
                    request: function (config) {

                        var token = $cookies.get("token");
                        if (token) {

                            config.headers.Authorization = 'Token ' + token;
                        }

                        return config;
                    },

                    response: function (response) {

                        var token = response.data.token;
                        if (token) {

                            $cookies.put('token', token);
                        }

                        return response;
                    },

                    responseError: function (response) {
                        if (response.status === 401) {
                            $cookies.remove('token');
                            $location.path('/');
                            return;
                        }
                        return $q.reject(response);
                    }
                };
            });

            $httpProvider.interceptors.push('AuthTokenManager');
        }])


}());
