/* @ngInject */

angular.module('app').factory('boardItemFactory', function($http) {

    var board = this;

    board.getBoardInfo = function(id) {
        return $http.get('/api/boards/' + id)
            .then(function(rec) {
                return rec.data;
            });
    };

    return board;
});