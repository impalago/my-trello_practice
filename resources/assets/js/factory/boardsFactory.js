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