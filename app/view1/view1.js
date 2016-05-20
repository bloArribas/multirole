(function () {

    'use strict';

    angular.module('myApp.view1',
        [
            'ui.router',
            'ct.ui.router.extras.core',
            'permission',
            'permission.ui'
        ])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('view1', {
                    url: "/view1",
                    templateUrl: "view1/view1.html"
                })
        }])

        .controller('View1Ctrl', [function () {

        }]);
}());


