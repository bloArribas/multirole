(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ui.router',
        'myApp.view1',
        'myApp.view2',
        'myApp.version'
    ]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('view1');
        });
    }]);
}());
