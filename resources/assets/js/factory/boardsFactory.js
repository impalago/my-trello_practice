angular.module('app').factory('boardsFactory', function($http, $q) {

    var board = this;
    this.boardList = {};

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