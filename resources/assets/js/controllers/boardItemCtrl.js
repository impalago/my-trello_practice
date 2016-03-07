angular.module('app').controller('boardItemCtrl', function($scope, $uibModal, $routeParams, boardItemFactory) {
    $scope.init = function() {

    };

     boardItemFactory.getBoardInfo($routeParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });

    $scope.init();
});
