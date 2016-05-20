(function () {

    'use strict';

    angular.module('myApp.view2', ['ui.router'])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('view2', {
                    url: "/view2",
                    templateUrl: "view2/view2.html",
                    data: {
                        permissions: {
                            only: 'isLoggedIn',
                            redirectTo: 'view1'
                        }
                    }
                })
        }])

        .controller('View2Ctrl', [function () {

        }]);

}());