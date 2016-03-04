angular.module('app', ['ui.bootstrap']);
/**
 *  Initialize the material design
 */
$.material.init();
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

    board.deleteBoard = function(id) {
        var defer = $q.defer();

        $http.delete('/api/boards/destroy/' + id)
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