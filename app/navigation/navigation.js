(function () {

    'use strict';

    angular.module('myApp')

        .controller('NavigationCtrl', ['$state', '$rootScope', function ($state, $rootScope) {

            var isLoggedIn = this.isLoggedIn;
            var isAdmin = this.isAdmin;

            var toggleAdmin = function() {
                $rootScope.isAdmin = !$rootScope.isAdmin;
                $state.reload();
            }

            $rootScope.$on('userLoggedIn', function(event, args) {

                isLoggedIn = $rootScope.isLoggedIn;
                isAdmin = $rootScope.isAdmin;

            });

        }]);

}());