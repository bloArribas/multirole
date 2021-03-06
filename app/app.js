(function () {

    'use strict';

    angular.module('myApp', [
        'ui.router',
        'myApp.login',
        'myApp.dashboard',
        'myApp.dashboardAdmin',
        'myApp.services',
        'myApp.version',
        'ngCookies',
        'ct.ui.router.extras.core',
        'permission',
        'permission.ui'
    ])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {

            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go('login');
            });

        }])

        .config(['$urlRouterProvider', '$httpProvider', '$provide', function ($urlRouterProvider, $httpProvider, $provide) {

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

        .run(function (RoleStore, PermissionStore, $rootScope, GlobalRolesService) {

            // $rootScope.isAdmin = GlobalRolesService.isAdmin;
            // $rootScope.isLoggedIn = GlobalRolesService.isLoggedIn;

            // RoleStore.defineRole('ADMIN', function () {
            //     return GlobalRolesService.isAdmin;
            // });

            PermissionStore.definePermission('isLoggedIn', function () {
                return GlobalRolesService.isLoggedIn;
            });

            $rootScope.appReady = true;
        })

        .controller('myAppCtrl', ['$state', '$rootScope', 'PermissionStore', 'GlobalRolesService', function ($state, $rootScope, PermissionStore, GlobalRolesService) {
            
            $rootScope.$on('userLoggedIn', function(event, args) {
                console.log('Im appctrl and I was notified');
//                 PermissionStore.definePermission('isLoggedIn', function () {
// //                return $rootScope.isLoggedIn;
//                     return GlobalRolesService.isLoggedIn;
//                 });

            });

        }])

}());
