/* @ngInject */

angular.module('app').controller('boardItemCtrl', function($scope, $routeParams, boardItemFactory) {

    boardItemFactory.getBoardInfo($routeParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });
});
