/* @ngInject */

angular.module('app').controller('boardsCtrl', function($scope, boardsFactory, $uibModal, cfpLoadingBar) {

    $scope.init = function() {
        $scope.allBoards();
        $scope.board = {
            name: ''
        };

        $scope.loadStart = function() {
            cfpLoadingBar.start();
        };

        $scope.loadComplete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loadStart();
        $scope.fakeIntro = true;
    };

    $scope.allBoards = function() {
        boardsFactory.getBoards()
            .then(function(rec) {
                $scope.boards = boardsFactory.boardList;
                $scope.loadComplete();
                $scope.fakeIntro = false;
            });
    };

    $scope.createBoard = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create board';
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
        });
    };

    $scope.editBoard = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Edit board';
                boardsFactory.editBoard(id)
                    .then(function(rec) {

                        $scope.boardName = rec.name;
                        $scope.boardSubmit = function() {
                            if($scope.boardForm.$valid) {
                                boardsFactory.updateBoard(id, $scope.board)
                                    .then(function() {
                                        $uibModalInstance.close();
                                    });
                            }
                        };

                    });

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.deleteBoard = function(id) {
        $.confirm({
            title: 'Are you sure?',
            content: 'The board to move to a basket!',
            confirm: function(){
                boardsFactory.deleteBoard(id)
                    .then(function(rec) {
                        new PNotify({
                            title: 'Info',
                            text: 'Board successfully removed',
                            type: 'info',
                            delay: 3000
                        });
                        $scope.allBoards();
                    });
            }
        });
    };

    $scope.init();
});