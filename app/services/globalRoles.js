(function () {
    'use strict';

    angular
        .module('myApp.services', [])
        .factory('GlobalRolesService', GlobalRolesService);

    function GlobalRolesService() {

        var variables = {
            isLoggedIn: false,
            isAdmin: false
        };

        return variables;

    }

}());