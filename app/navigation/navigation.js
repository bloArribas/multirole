(function () {

    'use strict';

    angular.module('myApp')

        .controller('NavigationCtrl', ['$state', '$rootScope', 'GlobalRolesService', '$scope', function ($state, $rootScope, GlobalRolesService, $scope) {

            // var isLoggedIn = this.isLoggedIn;
            // var isAdmin = this.isAdmin;

            $scope.toggleAdmin = function() {
                GlobalRolesService.isAdmin = !GlobalRolesService.isAdmin;
                console.log('isAdmin service: ' + GlobalRolesService.isAdmin);
                $rootScope.$emit('adminToggle');
                $state.reload();
            };

            $rootScope.$on('userLoggedIn', function(event, args) {
                $scope.isLoggedIn = GlobalRolesService.isLoggedIn;
            });

            $rootScope.$on('adminToggle', function(event, args) {
                $scope.isLoggedIn = GlobalRolesService.isLoggedIn;
            });

        }]);

}());