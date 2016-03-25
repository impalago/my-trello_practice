/* @ngInject */

angular.module('app').factory('boardsFactory', function($http) {

    var board = this;
    this.boardList = {};

    board.getBoards = function() {
        return $http.get('/api/boards')
            .then(function(rec) {
                board.boardList = rec.data;
                return rec.data;
            });
    };

    board.createBoard = function(board) {
        return $http.post('/api/boards', board);
    };

    board.editBoard = function(id) {
        return $http.get('/api/boards/' + id + '/edit')
            .then(function(rec) {
                return rec.data;
            });
    };

    board.updateBoard = function(id, board) {
        return $http.put('/api/boards/' + id, board);
    };

    board.deleteBoard = function(id) {
        return $http.delete('/api/boards/' + id)
    };

    return board;
});