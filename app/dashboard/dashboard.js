(function () {

    'use strict';

    angular.module('myApp.dashboard', ['ui.router'])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('dashboard', {
                    url: "/dashboard",
                    controller: 'DashboardCtrl',
                    templateUrl: "dashboard/dashboard.html",
                    data: {
                        permissions: {
                            only: 'isLoggedIn',
                            redirectTo: 'login'
                        }
                    }
                })
        }])

        .controller('DashboardCtrl', ['GlobalRolesService', '$rootScope', function (GlobalRolesService, $rootScope) {

            var isLoggedIn = this.isLoggedIn;
            var isAdmin = this.isAdmin;

            $rootScope.$on('adminToggle', function(event, args) {
                isLoggedIn = GlobalRolesService.isLoggedIn;
                console.log('Im dashboard and I was notified');
            });

        }]);

}());