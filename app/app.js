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

        .run(function (RoleStore, PermissionStore, appAuth, $rootScope) {

            RoleStore.defineRole('ADMIN', function () {
                return appAuth.isAdmin;
            });

            PermissionStore.definePermission('isLoggedIn', function () {
                return appAuth.isLoggedIn;
            });

            $rootScope.appReady = true;

        })

        .value('appAuth', {
            isAdmin: false,
            isLoggedIn: false
        })

        .controller('myAppCtrl', ['appAuth', '$state', function (appAuth, $state) {

            this.toggleAdmin = toggleAdmin;

            this.appAuth = appAuth;

            this.isLoggedIn = appAuth.isLoggedIn;
            this.isAdmin = appAuth.isAdmin;

            function toggleAdmin() {
                appAuth.isAdmin = !appAuth.isAdmin;
                console.log('myAppCtrl isAdmin: ' + appAuth.isAdmin);
                console.log('myAppCtrl isLoggedIn: ' + appAuth.isLoggedIn);
                $state.reload();
            }

        }])

}());
