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

        .controller('DashboardCtrl', [function () {
            
        }]);

}());