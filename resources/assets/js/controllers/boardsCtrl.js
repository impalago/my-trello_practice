angular.module('app').controller('boardsCtrl', function($scope, boardsFactory, $uibModal) {

    $scope.init = function() {
        $scope.allBoards();
        $scope.board = {
            name: ''
        };
    };

    $scope.allBoards = function() {
        boardsFactory.getBoards()
            .then(function(rec) {
                $scope.boards = boardsFactory.boardList;
            }, function(err) {
                // error
            });
    };

    $scope.createBoard = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.boardSubmit = function() {
                    if($scope.boardForm.$valid) {
                        boardsFactory.createBoard($scope.board)
                            .then(function() {
                                $uibModalInstance.close();
                            });
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        }, function() {
            // error
        });
    };

    $scope.deleteBoard = function(id) {
        boardsFactory.deleteBoard(id)
            .then(function(rec) {
                $scope.allBoards();
            }, function(err) {
                // error
            });
    };

    $scope.init();
});