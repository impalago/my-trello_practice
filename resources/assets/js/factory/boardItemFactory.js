angular.module('app').factory('boardItemFactory', function($http, $q) {

    var board = this;

    board.getBoardInfo = function(id) {
        var defer = $q.defer();
        $http.get('/api/boards/' + id)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err) {
                deref.reject(err);
            });
        return defer.promise;
    };

    return board;
});