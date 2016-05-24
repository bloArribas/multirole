(function () {

    'use strict';

    angular.module('myApp.dashboardAdmin', ['ui.router'])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('dashboardAdmin', {
                    url: "/dashboardAdmin",
                    templateUrl: "dashboard_admin/dashboard_admin.html",
                    data: {
                        permissions: {
                            only: ['ADMIN'],
                            redirectTo: 'dashboard'
                        }
                    }
                })
        }])

        .controller('DashboardCtrl', [function () {

        }]);

}());