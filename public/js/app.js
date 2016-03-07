angular.module('app', ['ngRoute','ui.bootstrap']);
/**
 *  Initialize the material design
 */
$.material.init();
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

angular.module('app').controller('boardItemCtrl', function($scope, $uibModal, boardItemFactory) {
    console.log('boardItemCtrl');
});

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
                        $scope.allBoards();
                    });
            }
        });
    };

    $scope.init();
});
angular.module('app').factory('boardItemFactory', function($http, $q) {
    return {};
});
angular.module('app').factory('boardsFactory', function($http, $q) {

    var board = this;
    board.boardList = {};

    board.getBoards = function() {
        var defer = $q.defer();

        $http.get('/api/boards')
            .success(function(rec) {
                board.boardList = rec;
                defer.resolve(rec);
            }).error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.createBoard = function(board) {
        var defer = $q.defer();
        $http.post('/api/boards', board)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.editBoard = function(id) {
        var defer = $q.defer();
        $http.get('/api/boards/' + id + '/edit')
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.updateBoard = function(id, board) {
        var defer = $q.defer();
        $http.put('/api/boards/' + id, board)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.deleteBoard = function(id) {
        var defer = $q.defer();

        $http.delete('/api/boards/' + id)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    return board;
});
//# sourceMappingURL=app.js.map
