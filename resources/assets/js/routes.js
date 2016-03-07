angular.module('app').config(function($routeProvider) {

    $routeProvider

        .when('/boards', {
            templateUrl: '/api/boards-main',
            controller: 'boardsCtrl'
        })

        .when('/boards/:id', {
            templateUrl: '/api/boards-item',
            controller: 'boardItemCtrl'
        });

});
